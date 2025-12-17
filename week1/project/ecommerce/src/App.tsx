import { useState } from "react";
import products from "./fake-data/all-products";
import categories from "./fake-data/all-categories";
import Categories from "./components/Categories";
import ProductsList from "./components/ProductList";

/**
 * Убираем префикс "FAKE:" и приводим к нижнему регистру  ---- Remove "FAKE:" prefix and convert to lowercase
 */
const normalizeCategory = (value: string): string =>
  value.toLowerCase().replace("fake:", "").trim();

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Фильтруем товары по выбранной категории ---- Filter products by selected category
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          normalizeCategory(product.category) === selectedCategory
      )
    : products;

  return (
    <div>
      {/* Список категорий --- Categories list */}
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Список товаров --- Products list */}
      <ProductsList products={filteredProducts} />
    </div>
  );
}

export default App;
