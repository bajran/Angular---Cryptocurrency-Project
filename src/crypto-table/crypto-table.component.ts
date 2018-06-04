import {Component, OnDestroy,OnInit} from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CryptoCurrency } from '../models/crypto-currency.class';

@Component({
    selector:'crypto-table',
    templateUrl: './crypto-table.component.html',
    styleUrls:['./crypto-table.component.css']
})

export class CryptoTableComponent implements OnInit, OnDestroy{
   
    public topp100CryptosSub : Subscription;
    public top100Cryptos:CryptoCurrency[];
    public sortValues: any = {
                                rank : false, 
                                marketCap : true, 
                                volume : false, 
                                change24h : false,
                                price : false,
                                name:false
                            };
    public filteredCryptocurrency: CryptoCurrency[];
    public priceUnit : string = 'USD';

    constructor(private cryptoService: CryptoService){}

    ngOnInit(){
        this.getTop100Cryptos();
    }

    public getTop100Cryptos(): void {
        this.topp100CryptosSub = this.cryptoService.getAllCryptos().subscribe((data: CryptoCurrency[]) => {
            this.top100Cryptos = data;
            this.filteredCryptocurrency = this.top100Cryptos;
        });

    }

    public sortNumericValues(sortValue : boolean, key: string){     
        if(sortValue){
            this.top100Cryptos = this.top100Cryptos.sort(
                (a: CryptoCurrency, b:CryptoCurrency)=>{
                    return a[key]- b[key];
                 }
            );
        }else{ 
            this.top100Cryptos = this.top100Cryptos.sort(
                (a: CryptoCurrency, b:CryptoCurrency)=>{
                    return  b[key]- a[key];
                 }
            );
        }
    }


    public sortStringValues(sortValue: boolean){
        if(sortValue){
            this.top100Cryptos = this.top100Cryptos.sort(
                (a,b)=>{
                    const namea = a.name.toUpperCase();
                    const nameb = a.name.toUpperCase();

                    if(namea < nameb){
                        return -1;
                    }else if(namea > nameb){
                        return 1
                    }
                    return 0;
                });
        }else{
            this.top100Cryptos = this.top100Cryptos.sort(
                (a,b)=>{
                    const namea = a.name.toUpperCase();
                    const nameb = a.name.toUpperCase();

                    if(namea > nameb){
                        return -1;
                    }else if(namea < nameb){
                        return 1
                    }
                    return 0;
                });
        }
    }


    public listenFilterCryptos(e: CryptoCurrency[]){
        this.filteredCryptocurrency = e;
    }

    public listenPriceUnit(e: string){
        this.priceUnit = e;
        console.log(this.priceUnit);
    }
    ngOnDestroy(){
        this.topp100CryptosSub.unsubscribe();
    }
}