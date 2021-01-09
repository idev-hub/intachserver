import { Description, Property, Required } from "@tsed/schema";
import { Parser } from "./parser";

export interface IDetailCollege {
    name: string,
    fullname: string,

    [key: string]: string
}

export class CollegeCreation {

    @Description("Database assigned id")
    @Required()
    _id: number

    @Description("Detail information for college")
    @Required()
    detail: IDetailCollege
}

export class College extends CollegeCreation {
    @Description("City id")
    @Property()
    @Required()
    cityId: number

    @Required()
    parser: Parser
}