export class BitcoinMarket{

    public bitcoin_percentage_of_market_cap: number;
    public active_cryptocurrencies: number;
    public total_volume_usd: number;
    public active_markets: number;
    public total_market_cap_by_availabel_supply_usd: number;
    
    constructor(data:any){
            const defaults = {
                ...data               
            };

        this.bitcoin_percentage_of_market_cap = defaults.data.bitcoin_percentage_of_market_cap; //Bitcoin Dominanace
        this.active_cryptocurrencies = defaults.data.active_cryptocurrencies; //Total Currency
        this.active_markets = defaults.data.active_markets; //Total Active Market
        this.total_volume_usd = defaults.data.quotes.USD.total_volume_24h; //24hr volume
        this.total_market_cap_by_availabel_supply_usd = defaults.data.quotes.USD.total_market_cap; //Market cap   
    }

}