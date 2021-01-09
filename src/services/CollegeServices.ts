import { Service } from "@tsed/common";
import { College } from "../models/College";
import { Parser } from "../models/parser";
import { MemoryCollection } from "../utils/MemoryCollection";
import colleges from "../resources/colleges";

@Service()
export class CollegeServices extends MemoryCollection<College> {
    constructor () {
        super(College, colleges)
    }

    /**
     * Find a college by his ID.
     * @param id
     * @returns {undefined|College}
     */
    findById (id: number): College | undefined {
        return this.findOne({ _id: id });
    }
}