import { ISettingsParser, Parser } from "./Parser";
import axios, { AxiosRequestConfig } from "axios";

export class ApiParser extends Parser {
    protected api: string

    constructor (api: string, settings: ISettingsParser) {
        super(settings)
        this.api = api
    }

    public readonly query = async (url: string, config: AxiosRequestConfig = {}): Promise<any> => {
        return await axios.options(encodeURI(this.api + url), config)
    }
}