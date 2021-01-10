import ILesson from "../../../interfaces/ILesson";
import { DateTime } from "luxon";
import cheerio from "cheerio";
import { Parser } from "../index";
import { encodeURIWin1251 } from "../../../utils/encodeURIWin1251";
import axios from "axios";

export class WapAnosovParser extends Parser {
    constructor (api: string) {
        super(api, {
            weeks: true,
            teacherMode: true,
            complexes: false
        })
    }

    public readonly groups = async (): Promise<object[]> => {
        return [
            { name: 'AM-11', },
            { name: 'AT-41', },
            { name: 'ИС-41', },
            { name: 'ОД-31', },
            { name: 'TM-41', },
            { name: 'TM-42', },
            { name: 'Э-11', },
            { name: 'Э-41', },
            { name: 'Ю-31', },
            { name: 'Ю-32', },
        ]
    }

    public readonly lessonsWeek = async (params: { group: string, week?: number }): Promise<ILesson[]> => {
        const array: ILesson[] = []
        const offset = params.week
        let local = DateTime.local().setZone('Asia/Yekaterinburg').setLocale('ru-RU').set({ weekday: 1 }).startOf('day')

        if ( offset && offset > 0 ) {
            local = DateTime.local().setZone('Asia/Yekaterinburg').setLocale('ru-RU').set({ weekday: 1 }).startOf('day')
            .plus({ days: 7 * offset })
        }
        else if ( offset && offset < 0 ) {
            local = DateTime.local().setZone('Asia/Yekaterinburg').setLocale('ru-RU').set({ weekday: 1 }).startOf('day')
            .minus({ days: 7 * Math.abs(offset) })
        }

        for ( let i = 0; i < 6; i++ ) {
            array.push(await this.lessons({
                date: local.plus({ day: i }).toFormat('dd.LL.yyyy'),
                group: params.group,
                week: offset
            }))
        }

        return array
    }

    // TODO Ошибка с кодировкой группы
    // %C8%D1-41 на сайте это
    // %D0%98%D0%A1-41 получается это
    // ИС-41 что на самом деле
    public readonly lessons = async (params: { date: string, group: string, week?: number }): Promise<ILesson> => {
        const _date = DateTime.fromFormat(params.date, 'dd.LL.yyyy').setZone('Asia/Yekaterinburg').toFormat('yyyy-LL-dd')
        const $ = cheerio.load((await axios.get(`${this.api}rasp.php?d=${ _date }&g=${ encodeURIWin1251(params.group) }`)).data)

        const elements = $($('p')[0]).text().split('\n').filter(el => (el !== ""))
        const disciplines = []

        for ( let i = 0; i < elements.length; i++ ) {
            const reg = new RegExp(/(?<number>^[0-9]*)(?:\.\s)(?<discipline>.*(?=каб\.))(?:каб\.(?<cabinet>.*)(?=\())(?:\()(?<teacher>.*(?=\)))/i)
            const match = elements[i].match(reg)

            if ( match ) {
                disciplines.push({
                    number: parseInt(match[1].trim()),
                    discipline: match[2].trim(),
                    teacher: match[4].trim(),
                    cabinet: match[3].trim(),
                })
            }
        }

        return {
            date: DateTime.fromFormat(params.date, 'dd.LL.yyyy').setZone('Asia/Yekaterinburg').toISO() || undefined,
            group: params.group || undefined,
            week: params.week || 0,
            data: disciplines || []
        }
    }
}