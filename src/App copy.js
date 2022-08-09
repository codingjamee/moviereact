// import Button from './Button';
import styles from "./App.module.css";
import { useEffect, useState } from 'react';



function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState("");
  const [wantedCoins, setWantedCoins] = useState([])
  const [buy, setBuy] = useState("");
  
  const onChange = (e) => {
    setDollar(e.target.value);
  }
  
  

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => (response.json()))
      .then((json) => {
        setCoins(json)
        setLoading(false)
        console.log(json)
      });
  }, []) 

  const SelectedCoin = (e) => {
    e.preventDefault();
    setWantedCoins(coins[e.target.value - 1])

  }


  const Select = () => (
    <select onChange={SelectedCoin}>
      {coins.map((coin) =>(
        <option key={coin.id} value={coin.rank}>
          {coin.name} : ({coin.symbol}) : ${coin.quotes.USD.price} USD
        </option>
      ))}
    </select>
  )

  const submit = (e) => {
    e.preventDefault();
    setBuy(wantedCoins.quotes.USD.price / dollar)
  }

  return (
    <>
      <h1>The Coins! ({ coins.length })</h1>
        { loading ?
          <strong> Loading... </strong>
        : <Select />
        }
     
      <form onSubmit={submit}>
        <input
          onChange={onChange}
          value={dollar}
          placeholder={"input your dollar"}
        ></input>
        <button> Submit </button>
      </form>
       <h3>{ `you Can buy ${buy}` }</h3>
      
    </>
  );
}

export default App;
