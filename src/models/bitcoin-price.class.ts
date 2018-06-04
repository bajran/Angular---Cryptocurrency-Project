import {Injectable} from '@angular/core';
import {PriceCoordinates} from '../models/price-coordinates.interface'


@Injectable()

export class BitcoinPrice {
      
    public status : string;
    public name: string;
    public unit : string;
    public period : string;
    public description : string;
    public values : PriceCoordinates[];

    constructor(data?:any){
        const defaults = {
            values : [],
            ...data
            }
        
        this.status = defaults.status;
        this.name = defaults.name;
        this.unit = defaults.unit;
        this.period = defaults.period;
        this.description = defaults.description;
        this.values = defaults.values;
        
    }
}