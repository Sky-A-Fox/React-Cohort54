// src/pages/FavouritesPage.tsx
import { useState, useEffect } from 'react';
import { useFavourites } from '../context/FavouritesContext';
import ProductsList from '../components/ProductList';
import './FavouritesPage.css';
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

function FavouritesPage() {
  const { favouriteIds } = useFavourites();
  const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (favouriteIds.length === 0) {
        setFavouriteProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const promises = favouriteIds.map(id => 
          fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
              if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
              return res.json();
            })
        );

        const products = await Promise.all(promises);
        setFavouriteProducts(products);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load favourites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [favouriteIds]);

  if (loading) {
    return <div className="favourites-page__loading">Loading favourites...</div>;
  }

  if (error) {
    return <div className="favourites-page__error">Error: {error}</div>;
  }

  return (
    <div className="favourites-page">
      <h1 className="favourites-page__title">
        Favourites ({favouriteIds.length})
      </h1>
      {favouriteProducts.length > 0 ? (
        <ProductsList products={favouriteProducts} />
      ) : (
        <p className="favourites-page__empty">
          No favourites yet. Add some products from the Products page!
        </p>
      )}
    </div>
  );
}

export default FavouritesPage;