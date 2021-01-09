import { Description, Property, Required } from "@tsed/schema";

export class CityCreation {
    @Description("Database assigned id")
    @Required()
    _id: number

    @Description("City name")
    @Required()
    name: string
}

export class City extends CityCreation {
    @Description("Region id")
    @Property()
    @Required()
    regionId: number
}