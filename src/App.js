import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoinList from './components/CoinList';
import CoinDetail from './components/CoinDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="/coin/:symbol" element={<CoinDetail />} />
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
