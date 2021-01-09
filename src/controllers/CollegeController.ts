import { Controller, Get, Inject, PathParams, QueryParams } from "@tsed/common";
import { CollegeServices } from "../services/CollegeServices";
import { CollegeCreation } from "../models/College";
import { Description, Required, Returns, Summary } from "@tsed/schema";
import { NotFound } from "@tsed/exceptions";
import { IQueryParamsMethodCollege } from "../interfaces/IQueryParamsMethodCollege";
import { EMethods } from "../models/parser";

@Controller("/colleges")
export class CollegeController {
    @Inject()
    collegeService: CollegeServices

    @Get("/:id")
    @Summary("Return a college from his ID")
    @Returns(200, CollegeCreation)
    async get (@Description("The college id") @Required() @PathParams("id") id: number): Promise<CollegeCreation> {
        const college = await this.collegeService.findById(id)

        if ( !college ) throw new NotFound("College not found")
        return college
    }

    @Get("/:id/:method")
    @Summary("Return a college method")
    @Returns(200)
    async getMethod (
        @Description("The college id") @Required() @PathParams("id") id: number,
        @Description("The college method") @Required() @PathParams("method") method: EMethods,
        @QueryParams() params: IQueryParamsMethodCollege
    ) {
        const college = await this.collegeService.findById(id)
        if ( !college ) throw new NotFound("College not found")
        return await college.parser.runMethod(method, params)
    }

    @Get("/")
    @Summary("Return all colleges")
    @(Returns(200, Array).Of(CollegeCreation))
    async getAll (): Promise<CollegeCreation[]> {
        return this.collegeService.findAll()
    }
}