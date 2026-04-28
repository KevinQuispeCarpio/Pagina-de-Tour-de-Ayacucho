import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  favorites: string[];
  cart: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      favorites: [],
      cart: [],
      addFavorite: (id) => set((state) => ({ favorites: [...state.favorites, id] })),
      removeFavorite: (id) =>
        set((state) => ({ favorites: state.favorites.filter((favId) => favId !== id) })),
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
      addToCart: (id) => set((state) => ({ cart: [...state.cart, id] })),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((cartId) => cartId !== id) })),
    }),
    {
      name: 'ayacucho-tour-storage', // name of the item in the storage (must be unique)
    }
  )
);
