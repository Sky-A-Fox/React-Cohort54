interface CategoriesProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string) => void;
}

const normalizeCategory = (value: string): string =>
  value.toLowerCase().replace("fake:", "").trim();

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
            className={normalized === selectedCategory ? "active" : ""}
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
