import { normalizeCategory } from '../utils/categories';

interface CategoriesProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string) => void;
}

function Categories({
  categories,
  selectedCategory,
  onSelect,
}: CategoriesProps) {
  return (
    <div className="categories">
      {categories.map((cat) => {
        const normalized = normalizeCategory(cat);
        return (
          <button
            key={cat}
            className={`category-button ${normalized === selectedCategory ? "active" : ""}`}
            onClick={() => onSelect(normalized)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default Categories;