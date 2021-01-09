import { Required } from "@tsed/schema";

export interface ISettingsParser {
    weeks?: boolean, // Есть ли режим понедельной навигации
    complexes?: boolean, // Есть ли режим комлексов
    teacherMode?: boolean // Есть ли режим учителей
}

export class Parser {

    @Required()
    settings: ISettingsParser = {
        weeks: false,
        complexes: false,
        teacherMode: false
    }

    constructor (settings: ISettingsParser) {
        this.settings = settings
    }

    public lessons = (params: object): any => {
        return undefined
    }

    public lessonsWeek = (params: object): any => {
        return undefined
    }

    public complexes = (params: object): any => {
        return undefined
    }

    public groups = (params: object): any => {
        return undefined
    }
}