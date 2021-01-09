import { Controller, Get, Inject, PathParams } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { Description, Required, Returns, Summary } from "@tsed/schema";
import { City, CityCreation } from "../models/City";
import { CityService } from "../services/CityServices";
import { CollegeServices } from "../services/CollegeServices";
import { CollegeCreation } from "../models/College";

@Controller("/cities")
export class CityController {
    @Inject()
    cityService: CityService

    @Inject()
    collegeService: CollegeServices

    @Get("/:id")
    @Summary("Return a city from his ID")
    @Returns(200, CityCreation)
    async get (@Description("The city id") @Required() @PathParams("id") id: number): Promise<CityCreation> {
        const city = await this.cityService.findById(id)

        if ( !city ) throw new NotFound("City not found")
        return city
    }

    @Get("/:cityId/colleges")
    @Summary("Return a colleges from his city ID")
    @(Returns(200, Array).Of(CollegeCreation))
    async getColleges (@Description("The city id") @Required() @PathParams("cityId") cityId: number): Promise<CollegeCreation[]> {
        const city = await this.cityService.findById(cityId)

        if ( !city ) throw new NotFound("City not found")

        const colleges = await this.collegeService.findAll()
        return colleges.filter(value => (value.cityId === cityId))
    }


    @Get("/")
    @Summary("Return all cities")
    @(Returns(200, Array).Of(City))
    async getAll (): Promise<City[]> {
        return this.cityService.findAll()
    }
}