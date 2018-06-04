import { Component, OnInit } from '@angular/core';
import {BitcoinMarket}  from '../models/bitcoin-market.class'
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public bitcoinMarketCap : BitcoinMarket;
  
  constructor(private cryptoService : CryptoService){}

  ngOnInit(){
    this.getBitcoinStats();
  }
  
  public getBitcoinStats(): void{
    this.cryptoService.getBitcoinmarketCap().subscribe(
      (data:any)=>{
        this.bitcoinMarketCap = data;
      }
    );
  }


}
