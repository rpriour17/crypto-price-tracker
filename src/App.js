import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Coin from './Coin';



const api_url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"


function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get(api_url)
    .then(res => {
      setCoins(res.data);
    })
    .catch(err => alert(err));
  }, []);


  const handleChange = e => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="coin-app">
      <div className='coin-search'>
        <h1 className='coin-text'>
          Crypto Currency Prices
        </h1>
        <form>
          <input type="text" placeholder = "Search For Coin" className="coin-input" onChange={handleChange}/>
        </form>
      </div>
      <div className="headers">
        <h1>Coin</h1>
        <h1>Abb.</h1>
        <h1>Price</h1>
        <h1>Volume</h1>
        <h1>24H Change</h1>
        <h1>Market Cap</h1>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin key={coin.id} 
                name={coin.name} 
                image={coin.image}
                symbol = {coin.symbol}
                marketcap = {coin.market_cap}
                price = {coin.current_price}
                priceChange = {coin.price_change_percentage_24h}
                volume = {coin.total_volume}
          />
        )
      })}
    </div>
    
  );
}

export default App;
