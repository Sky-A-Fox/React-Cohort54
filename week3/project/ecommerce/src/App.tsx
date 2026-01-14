import { Routes, Route } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import FavouritesPage from './pages/FavouritesPage';

function App() {
  return (
    <FavouritesProvider>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </div>
    </FavouritesProvider>
  );
}

export default App;