import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';

interface FavouritesContextType {
  favouriteIds: number[];
  toggleFavourite: (id: number) => void;
  isFavourite: (id: number) => boolean;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

export function FavouritesProvider({ children }: { children: ReactNode }) {
  // Загружаем из localStorage при инициализации === Load from localStorage on init
  const [favouriteIds, setFavouriteIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('favouriteIds');
    return saved ? JSON.parse(saved) : [];
  });

  // Сохраняем в localStorage при изменении === Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('favouriteIds', JSON.stringify(favouriteIds));
  }, [favouriteIds]);

  const toggleFavourite = (id: number) => {
    setFavouriteIds(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const isFavourite = (id: number) => favouriteIds.includes(id);

  return (
    <FavouritesContext.Provider value={{ favouriteIds, toggleFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) throw new Error('useFavourites must be used within FavouritesProvider');
  return context;
}