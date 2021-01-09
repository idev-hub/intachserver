import { Controller, Get, Inject, PathParams } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { Description, Required, Returns, Summary } from "@tsed/schema";
import { RegionService } from "../services/RegionServices";
import { Region } from "../models/Region";
import { CityService } from "../services/CityServices";
import { City } from "../models/City";

@Controller("/regions")
export class RegionController {
    @Inject()
    regionService: RegionService

    @Inject()
    citiesService: CityService

    @Get("/:id")
    @Summary("Return a region from his ID")
    @Returns(200, Region)
    async get (@Description("The region id") @Required() @PathParams("id") id: number): Promise<Region> {
        const region = await this.regionService.findById(id)

        if ( !region ) throw new NotFound("Region not found")
        return region
    }

    @Get("/:regionId/cities")
    @Summary("Return a cities from his region ID")
    @(Returns(200, Array).Of(City))
    async getCities (@Description("The region id") @Required() @PathParams("regionId") regionId: number): Promise<City[]> {
        const region = await this.regionService.findById(regionId)

        if ( !region ) throw new NotFound("Region not found")

        const cities = await this.citiesService.findAll()
        return cities.filter(value => (value.regionId === regionId))
    }

    @Get("/")
    @Summary("Return all regions")
    @(Returns(200, Array).Of(Region))
    async getAll (): Promise<Region[]> {
        return this.regionService.findAll()
    }
}