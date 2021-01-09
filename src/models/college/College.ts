import { Required } from "@tsed/schema";
import { Parser } from "../parser/Parser";

export interface IDetailCollege {
    site?: string,
    description?: string,
    city?: string,
    region?: string,
    name: string,
    fullname: string,
    logotype?: string
}

export class College {

    @Required()
    id: number

    parser: Parser

    @Required()
    detail: IDetailCollege

    constructor (id: number,  detail: IDetailCollege, parser: Parser) {
        this.id = id
        this.parser = parser

        this.detail = detail
    }
}