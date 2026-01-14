// src/pages/ProductPage.tsx
import { useParams } from 'react-router-dom';
import HeartButton from '../components/HeartButton';
import useFetch from '../hooks/useFetch';
import './ProductPage.css';

interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function ProductPage() {
  const { id } = useParams();
  
  // Используем useFetch хук для загрузки товара === Use useFetch hook to load product
  const { 
    data: product, 
    loading, 
    error 
  } = useFetch<ProductDetails>(
    id ? `https://fakestoreapi.com/products/${id}` : ''
  );

  // Показываем состояние загрузки === Show loading state
  if (loading) {
    return <div className="product-page-loading">Loading product details...</div>;
  }
  
  // Показываем ошибку, если есть === Show error if exists
  if (error) {
    return <div className="product-page-error">Error: {error}</div>;
  }
  
  // Если товар не найден === If product not found
  if (!product) {
    return <div className="product-page-not-found">Product not found</div>;
  }

  return (
    <div className="product-page">
      {/* Заголовок и цена === Show title and price */}
      <div className="product-header">
        <div className="product-title-section">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
        
        <div className="heart-button-container">
          <HeartButton productId={product.id} isAbsolute={false} />
        </div>
      </div>
      
      <div className="product-content">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-image"
        />
        
        <div className="product-section">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        
        <div className="product-section">
          <h3>Category</h3>
          <p>{product.category}</p>
        </div>
        
        <div className="product-section">
          <h3>Rating</h3>
          <p>{product.rating.rate} / 5 ({product.rating.count} reviews)</p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;