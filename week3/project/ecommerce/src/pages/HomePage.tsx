import { useState, useEffect, useRef } from "react";
import Categories from "../components/Categories";
import ProductsList from "../components/ProductList";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Используем ref для отслеживания первого рендера
  const isInitialMount = useRef(true);

  // Загружаем категории при первом рендере
  useEffect(() => {
    let isMounted = true;
    
    const loadCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        if (!response.ok) throw new Error('Failed to load categories');
        const data = await response.json();
        if (isMounted) {
          setCategories(data);
        }
      } catch (err) {
        if (isMounted && err instanceof Error) {
          setError("Failed to load categories: " + err.message);
        }
      }
    };
    
    loadCategories();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Загружаем товары при изменении категории
  useEffect(() => {
    let isMounted = true;
    
    const loadProducts = async () => {
      // Устанавливаем loading только если это не первый рендер
      if (!isInitialMount.current) {
        setLoading(true);
      }
      
      try {
        const url = selectedCategory 
          ? `https://fakestoreapi.com/products/category/${selectedCategory}`
          : "https://fakestoreapi.com/products";
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load products');
        const data = await response.json();
        
        if (isMounted) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted && err instanceof Error) {
          setError("Failed to load products: " + err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          isInitialMount.current = false;
        }
      }
    };
    
    loadProducts();
    
    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  // Показываем загрузку
  if (loading && products.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading products...</div>;
  }
  
  // Показываем ошибку
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <ProductsList products={products} />
    </div>
  );
}

export default HomePage;