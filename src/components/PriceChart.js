import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

function PriceChart({ symbol }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=30`)
      .then(res => {
        const prices = res.data.Data.Data;
        setChartData({
          labels: prices.map(p => new Date(p.time * 1000).toLocaleDateString()),
          datasets: [
            {
              label: 'Price (USD)',
              data: prices.map(p => p.close),
              borderColor: 'blue',
              fill: false,
            },
          ],
        });
      });
  }, [symbol]);

  return chartData ? <Line data={chartData} /> : <p>Loading chart...</p>;
}

export default PriceChart;
