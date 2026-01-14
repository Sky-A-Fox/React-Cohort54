interface CategoriesProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

function Categories({
  categories,
  selectedCategory,
  onSelect,
}: CategoriesProps) {
  return (
    <div className="categories">
      {/* Кнопка "Все товары" */}
      <button
        key="all"
        className={`category-button ${selectedCategory === null ? "active" : ""}`}
        onClick={() => onSelect(null)}
      >
        All Products
      </button>
      
      {/* Категории из API */}
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${category === selectedCategory ? "active" : ""}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Categories;