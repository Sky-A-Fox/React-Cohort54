// src/components/ProductList.tsx
import { Link } from 'react-router-dom';
import HeartButton from './HeartButton';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductsListProps {
  products: Product[];
}

function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product-card-wrapper">
          <Link to={`/product/${product.id}`} className="product-link">
            <div className="product-card">
              <img src={product.image} alt={product.title} />
              <HeartButton productId={product.id} />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductsList;