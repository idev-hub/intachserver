import { Controller, Get, PathParams, QueryParams } from "@tsed/common";
import { CollegeServices } from "../services/CollegeServices";
import { College } from "../models/college/College";

@Controller("/colleges")
export class CollegeController {
    constructor (private readonly collegeServices: CollegeServices) {}

    @Get('/:id')
    async findOne (@PathParams("id") id: number): Promise<College | undefined> {
        return this.collegeServices.findByPk(id)
    }

    @Get('/:id/settings')
    async findMethods (@PathParams("id") id: number): Promise<object | undefined> {
        return this.collegeServices.findSettigns(id)
    }

    @Get('/:id/lessons')
    async findLessons (@QueryParams("week") week: number, @QueryParams("group") group: string, @QueryParams("date") date: string, @PathParams("id") id: number): Promise<any> {
        return this.collegeServices.findByPk(id)?.parser.lessons({
            date: date,
            group: group,
            week: week || undefined
        })
    }

    @Get('/:id/complexes')
    async findComplexes (@PathParams("id") id: number): Promise<any> {
        return this.collegeServices.findByPk(id)?.parser.complexes({})
    }

    @Get('/:id/groups')
    async findGroups (@QueryParams("complex") complex: number, @PathParams("id") id: number): Promise<any> {
        return this.collegeServices.findByPk(id)?.parser.groups({
            complex: complex
        })
    }

    @Get('/:id/lessonsWeek')
    async findLessonsWeek (@QueryParams("complex") complex: number, @QueryParams("week") week: number, @QueryParams("group") group: string, @PathParams("id") id: number): Promise<any> {
        return this.collegeServices.findByPk(id)?.parser.lessonsWeek({
            group: group,
            week: week || undefined,
            complex: complex || undefined
        })
    }

    @Get()
    async findAll (): Promise<College[]> {
        return this.collegeServices.findAll()
    }
}