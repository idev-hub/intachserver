import { ApiParser } from "./ApiParser";
import { AxiosRequestConfig } from "axios";
import cheerio from "cheerio";
import { ISettingsParser } from "./Parser";

export default class HtmlParser extends ApiParser {

    constructor (api: string, settigns: ISettingsParser) {
        super(api, settigns)
    }

    public readonly $ = async (url: string, config: AxiosRequestConfig = { method: 'get' }): Promise<object> => {
        return cheerio.load(await this.query(encodeURI(this.api + url), config))
    }
}