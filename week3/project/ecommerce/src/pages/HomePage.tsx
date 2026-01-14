// src/pages/HomePage.tsx
import { useState } from "react";
import Categories from "../components/Categories";
import ProductsList from "../components/ProductList";
import useFetch from "../hooks/useFetch";
import "./HomePage.css";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Загружаем категории через useFetch хук === Load categories via useFetch hook
  const { 
    data: categories, 
    loading: categoriesLoading, 
    error: categoriesError 
  } = useFetch<string[]>("https://fakestoreapi.com/products/categories");
  
  // Формируем URL для товаров в зависимости от выбранной категории === Form products URL based on selected category
  const productsUrl = selectedCategory 
    ? `https://fakestoreapi.com/products/category/${selectedCategory}`
    : "https://fakestoreapi.com/products";
  
  // Загружаем товары через useFetch хук === Load products via useFetch hook
  const { 
    data: products, 
    loading: productsLoading, 
    error: productsError 
  } = useFetch<Product[]>(productsUrl);
  
  // Объединяем состояния загрузки и ошибок === Combine loading and error states
  const loading = categoriesLoading || productsLoading;
  const error = categoriesError || productsError;

  // Показываем состояние загрузки === Show loading state
  if (loading) {
    return <div className="home-page-loading">Loading products...</div>;
  }
  
  // Показываем ошибку, если есть === Show error if exists
  if (error) {
    return <div className="home-page-error">Error: {error}</div>;
  }

  return (
    <div className="home-page">
      <div className="home-page-categories">
        {/* Категории рендерим только если они загрузились === Render categories only if they are loaded */}
        {categories && (
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        )}
      </div>

      <div className="home-page-products">
        {/* Товары рендерим только если они загрузились === Render products only if they are loaded */}
        {products && <ProductsList products={products} />}
      </div>
    </div>
  );
}

export default HomePage;