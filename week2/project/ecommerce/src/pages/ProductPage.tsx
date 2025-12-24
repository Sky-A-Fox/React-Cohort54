import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setError(null);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading product details...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
  if (!product) return <div style={{ padding: '20px' }}>Product not found</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h1>{product.title}</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#213547' }}>
            ${product.price.toFixed(2)}
          </p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ maxWidth: '300px', height: 'auto', margin: '0 auto' }}
          />
          
          <div>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div>
            <h3>Category</h3>
            <p>{product.category}</p>
          </div>
          
          <div>
            <h3>Rating</h3>
            <p>{product.rating.rate} / 5 ({product.rating.count} reviews)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;