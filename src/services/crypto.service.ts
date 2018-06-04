import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { BitcoinMarket } from '../models/bitcoin-market.class';
import {CryptoCurrency} from '../models/crypto-currency.class'
import { BitcoinPrice } from '../models/bitcoin-price.class';

@Injectable()
export class CryptoService{
    

    constructor(public http : HttpClient){}

    public getBitcoinmarketCap(): Observable<BitcoinMarket>{
        return this.http.get('https://api.coinmarketcap.com/v2/global/').map(
                        (data:any)=>{
                            return new BitcoinMarket(data)
                        }
                )
    }

    public getAllCryptos(): Observable<CryptoCurrency[]> {
        return this.http.get('https://api.coinmarketcap.com/v1/ticker/').map((data: any) => {
            return data.map((crypto: any) => {
                return new CryptoCurrency(crypto);
            });
        });
    }

    public getBitcoinPriceStats() : Observable <BitcoinPrice>{
        return this.http.get('https://api.blockchain.info/charts/market-price?cors=true&format=json&lang=en')
                        .map((data:any )=>{
                                return new BitcoinPrice(data);
                        });
    }


}