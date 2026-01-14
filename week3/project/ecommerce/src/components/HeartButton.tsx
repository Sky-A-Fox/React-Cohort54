// src/components/HeartButton.tsx
import { useFavourites } from '../context/FavouritesContext.tsx';
import './HeartButton.css';

interface HeartButtonProps {
  productId: number;
  isAbsolute?: boolean;
}

function HeartButton({ productId, isAbsolute = true }: HeartButtonProps) {
  const { toggleFavourite, isFavourite } = useFavourites();
  const favourite = isFavourite(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(productId);
  };

  // Определяем классы в зависимости от пропсов === classes based on props
  const buttonClassNames = `heart-button ${isAbsolute ? 'heart-button--absolute' : 'heart-button--static'}`;

  return (
    <button 
      className={buttonClassNames}
      onClick={handleClick}
      aria-label={favourite ? 'Remove from favourites' : 'Add to favourites'}
      title={favourite ? 'Remove from favourites' : 'Add to favourites'}
    >
      <img 
        src={favourite ? "/src/assets/heart-solid.svg" : "/src/assets/heart-regular.svg"}
        alt={favourite ? "Remove from favourites" : "Add to favourites"}
        className="heart-button__icon"
      />
    </button>
  );
}

export default HeartButton;