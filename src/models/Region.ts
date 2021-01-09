import { CollectionOf, Description, Required } from "@tsed/schema";
import { City } from "./City";

export class Region {
    @Description("Database assigned id")
    @Required()
    _id: number

    @Description("Region name")
    @Required()
    name: string
}