import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function CoinDetail() {
  const { symbol } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD`)
      .then(res => {
        setDetails(res.data.DISPLAY[symbol]?.USD);
      })
      .catch(err => console.error(err));
  }, [symbol]);

  return (
    <div>
      <h2>Details for {symbol}</h2>
      {details ? (
        <ul>
          <li>Price: {details.PRICE}</li>
          <li>Market Cap: {details.MKTCAP}</li>
          <li>Change (24h): {details.CHANGE24HOUR}</li>
          <li>Volume: {details.VOLUME24HOUR}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CoinDetail;
