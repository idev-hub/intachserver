import { Injectable } from "@tsed/common";
import { MemoryCollection } from "../utils/MemoryCollection";
import { City } from "../models/City";
import cities from "../resources/cities";

@Injectable()
export class CityService extends MemoryCollection<City> {
    constructor () {
        super(City, cities);
    }

    /**
     * Find a city by his ID.
     * @param id
     * @returns {undefined|City}
     */
    findById (id: number): City | undefined {
        return this.findOne({ _id: id });
    }
}