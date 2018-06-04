import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes, Router} from '@angular/router';

import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { CryptoService } from '../services/crypto.service';
import { NotFoundComponent } from '../not-found/not-found.component';
import { BitcoinStatsComponent } from '../bitcoin-stats/bitcoin-stats.component'
import { CryptoTableComponent } from '../crypto-table/crypto-table.component';
import { CryptoFilterComponent } from '../crypto-filter/crypto-filter.component'; 

const appRoutes: Routes =[
  {path:'', component:CryptoTableComponent},
  {path:'bitcoinStats', component: BitcoinStatsComponent},
  {path:'**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CryptoTableComponent,
    NotFoundComponent,
    BitcoinStatsComponent,
    CryptoFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ChartModule
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
