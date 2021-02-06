import axios, { AxiosRequestConfig } from "axios";
import { IQueryParamsMethodCollege } from "../../interfaces/IQueryParamsMethodCollege";

export interface ISettingsParser {
    weeks: boolean, // Есть ли режим понедельной навигации
    complexes: boolean, // Есть ли режим комлексов
    teacherMode: boolean, // Есть ли режим учителей
    groups: boolean
}

export enum EMethods {
    lessons = "lessons",
    lessonsWeek = "lessonsWeek",
    complexes = "complexes",
    groups = "groups"
}

export class Parser {

    public api: string
    public settings: ISettingsParser = {
        weeks: false,
        complexes: false,
        teacherMode: false,
        groups: false
    }

    constructor (api: string, settings: ISettingsParser) {
        this.api = api
        this.settings = settings
    }

    public readonly query = async (url: string, config: AxiosRequestConfig = {}): Promise<any> => {
        return axios(encodeURI(this.api + url), config);
    }

    public readonly runMethod = async (method: EMethods, params: IQueryParamsMethodCollege) => {
        return await this[method](params)
    }

    public lessons: any
    public lessonsWeek: any
    public complexes: any
    public groups: any
}