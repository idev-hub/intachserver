import { Service } from "@tsed/common";
import { College } from "../models/college/College";
import { ChgpgtParser } from "../models/parser/colleges/ChgpgtParser";
import ProCollegeParser from "../models/parser/colleges/ProCollegeParser";
import { WapAnosovParser } from "../models/parser/colleges/WapAnosovParser";
import { Parser } from "../models/parser/Parser";

@Service()
export class CollegeServices {
    private readonly colleges: College[] = []

    constructor () {

        // TODO ЕСТь ПРЕПОДОВАТЕЛИ
        this.create(new College(1, {
            fullname: 'Челябинский государственный промышленно-гуманитарный техникум им. А.В. Яковлева',
            name: 'ЧГПГТ имени А.В. Яковлева'
        }, new ChgpgtParser()))

        this.create(new College(2, {
            fullname: 'ГБПОУ Челябинский энергетический колледж им. С.М. Кирова',
            name: 'ЧЭК имени С.М. Кирова'
        }, new ProCollegeParser('https://pronew.chenk.ru/blocks/manage_groups/website/')))

        this.create(new College(3, {
            fullname: 'ЮУМК',
            name: 'ГБПОУ Южно-Уральский многопрофильный колледж'
        }, new ProCollegeParser('https://is.suvc.ru/blocks/manage_groups/website/')))

        this.create(new College(4, {
            fullname: 'ГБПОУ «МиМК»',
            name: 'Государственное бюджетное профессиональное образовательное учреждение «Миасский машиностроительный колледж»'
        }, new ProCollegeParser('https://pc.miassmk.ru/blocks/manage_groups/website/')))

        // TODO ПЛОХО РАБОАЕТ САЙТ
        this.create(new College(5, {
            fullname: 'ЧГК «Рост»',
            name: 'Государственное бюджетное профессиональное образовательное учреждение Челябинский государственный колледж «Рост»'
        }, new ProCollegeParser('http://78.29.12.235/blocks/manage_groups/website/')))

        // TODO ЕСТь ПРЕПОДОВАТЕЛИ
        this.create(new College(6, {
            fullname: 'ЗИК им. П.П. Аносова',
            name: 'ФГОУ СПО «Златоустовский индустриальный колледж им. П.П. Аносова»'
        }, new WapAnosovParser('http://wap.anosov.ru/')))
    }

    protected create (college: College) {
        this.colleges.push(college)
    }

    public findSettigns (id: number) {
        const college = this.findByPk(id)
        if ( college && college.parser && college.parser.settings ) {
            return college.parser.settings
        }

        return undefined
    }

    public findParser (id: number): Parser | undefined {
        const college = this.findByPk(id)
        if ( college ) return college.parser
        return undefined
    }

    public findByPk (id: number): College | undefined {
        for ( let i = 0; i < this.colleges.length; i++ ) {
            if ( this.colleges[i].id === id ) return this.colleges[i]
        }

        return undefined
    }

    public findAll (): College[] {
        return this.colleges
    }
}