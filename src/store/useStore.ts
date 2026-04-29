import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface StoreState {
  favorites: string[];
  cart: string[];
  user: User | null;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      favorites: [],
      cart: [],
      user: null,
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
      clearCart: () => set({ cart: [] }),
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'ayacucho-tour-storage', // name of the item in the storage (must be unique)
    }
  )
);
