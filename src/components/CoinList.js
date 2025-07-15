import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CoinList() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD')
      .then((res) => {
        setCoins(res.data.Data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.CoinInfo.Name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>CryptoHustle Pro</h1>

      <input
        type="text"
        placeholder="Search by symbol (e.g. BTC)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          margin: '20px 0',
          fontSize: '16px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />

      {filteredCoins.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredCoins.map((coin) => {
            const info = coin.CoinInfo;
            const imageUrl = info.ImageUrl
              ? `https://www.cryptocompare.com${info.ImageUrl}`
              : '';
            const price = coin.RAW?.USD?.PRICE
              ? `$${coin.RAW.USD.PRICE.toFixed(2)}`
              : 'N/A';

            return (
              <li
                key={info.Id}
                style={{
                  marginBottom: '15px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '10px',
                }}
              >
                <Link
                  to={`/coin/${info.Name}`}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={info.Name}
                      width="30"
                      style={{ marginRight: '10px' }}
                    />
                  )}
                  <div>
                    <strong>{info.FullName}</strong>
                    <div style={{ fontSize: '14px', color: 'gray' }}>
                      {info.Name} – {price}
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CoinList;
