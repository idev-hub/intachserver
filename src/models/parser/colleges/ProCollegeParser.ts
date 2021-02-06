import cheerio from "cheerio";
import ISubject from "../../../interfaces/ISubject";
import ILesson from "../../../interfaces/ILesson";
import { DateTime } from "luxon";
import { Parser } from "../index";
import { IQueryParamsMethodCollege } from "../../../interfaces/IQueryParamsMethodCollege";

interface IParam {
    id: number,
    name: string,
    link: string,
}

export default class ProCollegeParser extends Parser {
    constructor (api: string) {
        super(api, {
            weeks: true,
            complexes: true,
            teacherMode: false,
            groups: true
        })
    }

    public readonly lessons = async (params: { date: string, complex: number, group: string }) => {
        const requestedDate = DateTime.fromFormat(params.date, 'dd.LL.yyyy', { locale: "ru-RU", }).setZone('Asia/Yekaterinburg') || undefined
        const septemberDate = DateTime.fromFormat('01.09', 'dd.LL', { locale: "ru-RU", }).setZone('Asia/Yekaterinburg') || undefined
        const week = septemberDate.weekNumber - requestedDate.weekNumber
        return {
            week: week,
            requestedDate: requestedDate.weekNumber,
            septemberDate: septemberDate.weekNumber
        }
    }

    public readonly complexes = async (): Promise<IParam[]> => {
        const _complexes: IParam[] = []
        const $ = cheerio.load((await this.query('view1.php', { method: "get" })).data)

        const elements = $('.spec-year-block-container span.spec-select-block')
        elements.each((index, element) => {
            const a = $('a', element)
            _complexes.push({
                id: parseInt(element.attribs.group_id),
                name: a.text(),
                link: String(a.attr('href'))
            })
        })

        return _complexes
    }

    public readonly groups = async (params: IQueryParamsMethodCollege): Promise<IParam[]> => {
        const _groups: IParam[] = []

        const complex = (await this.complexes()).find(c => (c.id) === parseInt(<string><unknown>params.complex))
        if ( complex ) {
            const $ = cheerio.load((await this.query(String(complex.link), { method: "get" })).data)
            const elements = $('.spec-year-block-container span.group-block')

            elements.each((index, element) => {
                const a = $('a', element)
                _groups.push({
                    id: parseInt(element.attribs.group_id),
                    name: a.text(),
                    link: String(a.attr('href'))
                })
            })
        }

        return _groups
    }

    public readonly lessonsWeek = async (params: { complex: number, group: string, week?: number }): Promise<ILesson[]> => {
        const lessons: ILesson[] = []

        const group = (await this.groups({ complex: params.complex })).find(g => (g.id === parseInt(params.group)))
        if ( group ) {
            let link = String(group.link)
            if ( params.week ) link += "&week=" + params.week

            const $ = cheerio.load((await this.query(link, { method: "get" })).data)
            const elements = $('.timetableContainer td')
            const week = parseInt($('.weekHeader > span').text())

            elements.each(((index, element) => {
                const dateText = $('.dayHeader > span', element).text()
                const lessonBlocks = $('.lessonBlock', element)

                const disciplines: ISubject[] = []


                lessonBlocks.each((indexLesson, lesson) => {
                    const discipline = $('.discBlock .discHeader > span', lesson).text()
                    const teacher = $('.discBlock .discSubgroupTeacher > span', lesson).text()
                    const cabinet = $('.discBlock .discSubgroupClassroom > span', lesson).text()

                    const times = $('.lessonTimeBlock > div', lesson)
                    const number = $(times[0]).text()
                    const start = $(times[1]).text()
                    const end = $(times[2]).text()

                    disciplines.push({
                        number: parseInt(number),
                        discipline: discipline || undefined,
                        teacher: teacher || undefined,
                        cabinet: cabinet || undefined,
                        time: {
                            start: start || undefined,
                            end: end || undefined
                        }
                    })
                })

                lessons.push({
                    date: DateTime.fromFormat(dateText.toLowerCase().split(',')[0], 'd MMMM', {
                        locale: "ru-RU",
                        zone: "Asia/Yekaterinburg"
                    }).toISO() || undefined,
                    group: group.name || undefined,
                    week: week || undefined,
                    data: disciplines || []
                })
            }))
        }

        return lessons
    }
}
