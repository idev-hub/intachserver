import { College } from "../models/College";
import { ChgpgtParser } from "../models/parser/colleges/ChgpgtParser";
import ProCollegeParser from "../models/parser/colleges/ProCollegeParser";
import { WapAnosovParser } from "../models/parser/colleges/WapAnosovParser";

export default <College[]>[
    {
        _id: 1,
        cityId: 1,
        detail: {
            fullname: "Государственное бюджетное профессиональное образовательное учреждение «Челябинский государственный промышленно-гуманитарный техникум имени А.В. Яковлева»",
            name: "ГБПОУ «ЧГПГТ им.А.В. Яковлева»",
            adress: "Российская Федерация, 454139, Челябинская область, г. Челябинск,  ул. Машиностроителей, 31.",
            foundationDate: "13.01.1946",
            emails: [ "info@chgpgt.ru" ],
            url: "https://chgpgt.ru/",
            phones: [
                "+7 (351) 253-34-39",
                "+7 (351) 253-34-54"
            ]
        },
        parser: new ChgpgtParser()
    }, // TODO ЕСТь ПРЕПОДОВАТЕЛИ
    {
        _id: 2,
        cityId: 1,
        detail: {
            fullname: "ГБПОУ Челябинский энергетический колледж им. С.М. Кирова",
            name: "ЧЭК имени С.М. Кирова",
            adress: "Российская Федерация, 454006, Челябинская область, г. Челябинск,  ул. Российская, 23.",
            foundationDate: "27.07.1930",
            emails: [ "174energo@mail.ru" ],
            url: "https://chenk.ru/",
            phones: [ "+7 (351) 264-12-89" ]
        },
        parser: new ProCollegeParser('https://pronew.chenk.ru/blocks/manage_groups/website/')
    },
    {
        _id: 3,
        cityId: 1,
        detail: {
            fullname: "ГБПОУ Южно-Уральский многопрофильный колледж",
            name: "ЮУМК",
            adress: "Российская Федерация, 454113, Челябинская область, г. Челябинск,  ул. Революции площадь, 4.",
            foundationDate: "01.11.2012",
            emails: [ "common@suvc.ru" ],
            url: "https://www.suvc.ru/",
            phones: [ "+7 (351) 263-67-62" ]
        },
        parser: new ProCollegeParser('https://is.suvc.ru/blocks/manage_groups/website/')
    },
    {
        _id: 4,
        cityId: 2,
        detail: {
            fullname: "Государственное бюджетное профессиональное образовательное учреждение «Миасский машиностроительный колледж»",
            name: "ГБПОУ «МиМК»"
        },
        parser: new ProCollegeParser('https://pc.miassmk.ru/blocks/manage_groups/website/')
    },
    {
        _id: 5,
        cityId: 1,
        detail: {
            fullname: "Государственное бюджетное профессиональное образовательное учреждение Челябинский государственный колледж «Рост»",
            name: "ЧГК «Рост»"
        },
        parser: new ProCollegeParser('http://78.29.12.235/blocks/manage_groups/website/')
    },
    {
        _id: 6,
        cityId: 3,
        detail: {
            fullname: "ГБПОУ Златоустовский индустриальный колледж им. П. П. Аносова",
            name: "ЗИК им. П.П. Аносова"
        },
        parser: new WapAnosovParser('http://wap.anosov.ru/')
    }, // TODO ЕСТь ПРЕПОДОВАТЕЛИ
]