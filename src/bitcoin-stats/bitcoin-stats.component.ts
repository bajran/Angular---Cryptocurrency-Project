import {Component} from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import {BitcoinPrice} from '../models/bitcoin-price.class'
import {PriceCoordinates} from '../models/price-coordinates.interface'

@Component({
    selector : 'bitcoin-stats',
    templateUrl:'./bitcoin-stats.component.html',
    styleUrls:['./bitcoin-stats.component.css']
})

export class BitcoinStatsComponent{

    public bitcoinStats : BitcoinPrice = new BitcoinPrice();
    public prices : number[];
    public dates : string[];
    public options : any;
    public type : any;
    public chartData : any;


    constructor(private cryptoService : CryptoService){
        this.cryptoService.getBitcoinPriceStats().subscribe(
            (data:any)=>{
                this.bitcoinStats = data;
                this.prices = this.convertPrices();
                this.dates = this.convertDates();
                
                /*ChartJs Code from Chartjs Library*/ 
                this.type = 'line';
                this.chartData = {
                labels: this.dates,
                datasets: [
                    {
                    label: `Bitcoin (${this.bitcoinStats.unit})`,
                    data: [...this.prices],
                    backgroundColor : 'rgba(0,0,0,0.5)',
                    borderColor : '#6699f6'
                    }
                ]
                };
                this.options = {
                scales: {
                    xAxes: [{
                        gridLines:{
                            color : 'rgba(255,255,255,0.3)'
                        }
                    }],
                    yAxes: [{
                        gridLines:{
                            color : 'rgba(255,255,255,0.8)'
                        }
                    }]
                },
                legend: {
                    labels: {
                        fontColor: 'black'
                    }
                },
                responsive: true,
                maintainAspectRatio: false
                };
            }
        );
    }

    public convertPrices() : number[]{
        const prices = this.bitcoinStats.values.map((coordinates : PriceCoordinates)=>{
                return Number((coordinates.y).toFixed(2));
        });
        return prices;
    }


    public convertDates(): string[]{
        const dates =this.bitcoinStats.values.map((coordinates: PriceCoordinates)=>{
            const rawDate = new Date(coordinates.x * 1000);
            return `${rawDate.getMonth()}/${rawDate.getDay()}/${rawDate.getFullYear()}`;
        });
        return dates;
    }

}
