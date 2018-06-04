import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CryptoCurrency} from '../models/crypto-currency.class'

@Component({
    selector:'crypto-filter',
    templateUrl:'./crypto-filter.component.html',
    styleUrls:['./crypto-filter.component.css']
})
export class CryptoFilterComponent{
    @Input() public cryptos: CryptoCurrency[];

    @Output() public filteredCryptocurrencyEvent = new EventEmitter<CryptoCurrency[]>();
    @Output() public priceUnitEvent = new EventEmitter<string>();

    public filteredCryptocurrency : CryptoCurrency[];
    public percentChange : string = 'All';
    public showAmount : number = 100;
    public priceUnit :string = "USD";

    public filterCryptos() : void{
        this.percentChangeFilter();
        this.showOnlyFilter();
    }

    public filterEvent() :void{
       this.filteredCryptocurrencyEvent.emit(this.filteredCryptocurrency);
    }

    public priceEvent(): void{
        this.priceUnitEvent.emit(this.priceUnit);
    }

    public percentChangeFilter():void{
        this.filteredCryptocurrency = this.cryptos.filter((crypto : CryptoCurrency)=>{
            if(this.percentChange === 'Positive'){
                return crypto.percent_change_24h >= 0;
            }else if(this.percentChange === 'Negative'){
                return crypto.percent_change_24h < 0;
            }else{
                return crypto;
            }
        });
    }

    public showOnlyFilter():void{
        this.filteredCryptocurrency = this.filteredCryptocurrency.slice(0,this.showAmount);
        this.filterEvent();       
        this.priceEvent();
    }

}