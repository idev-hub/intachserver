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
        const parser = this.collegeServices.findParser(id)
        if ( parser ) {
            return parser.lessons({
                date: date,
                group: group,
                week: week || undefined
            })
        }
        return undefined
    }

    @Get('/:id/complexes')
    async findComplexes (@PathParams("id") id: number): Promise<any> {
        const parser = this.collegeServices.findParser(id)
        if ( parser ) {
            return parser.complexes({})
        }
        return undefined
    }

    @Get('/:id/groups')
    async findGroups (@QueryParams("complex") complex: number, @PathParams("id") id: number): Promise<any> {
        const parser = this.collegeServices.findParser(id)
        if ( parser ) {
            return parser.groups({
                complex: complex
            })
        }
        return undefined
    }

    @Get('/:id/lessonsWeek')
    async findLessonsWeek (@QueryParams("complex") complex: number, @QueryParams("week") week: number, @QueryParams("group") group: string, @PathParams("id") id: number): Promise<any> {
        const parser = this.collegeServices.findParser(id)
        if ( parser ) {
            return parser.lessonsWeek({
                group: group,
                week: week || undefined,
                complex: complex || undefined
            })
        }
        return undefined
    }

    @Get()
    async findAll (): Promise<College[]> {
        return this.collegeServices.findAll()
    }
}