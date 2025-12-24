import { Link } from 'react-router-dom';

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
        <Link 
          key={product.id} 
          to={`/product/${product.id}`}
          className="product-link"
        >
          <div className="product-card">
            <img src={product.image} alt={product.title} />
            <h3 className="product-title">{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductsList;