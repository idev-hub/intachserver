import { Injectable } from "@tsed/common";
import { Region } from "../models/Region";
import { MemoryCollection } from "../utils/MemoryCollection";
import regions from "../resources/regions";

@Injectable()
export class RegionService extends MemoryCollection<Region> {
    constructor () {
        super(Region, regions);
    }

    /**
     * Find a region by his ID.
     * @param id
     * @returns {undefined|Region}
     */
    findById (id: number): Region | undefined {
        return this.findOne({ _id: id });
    }
}