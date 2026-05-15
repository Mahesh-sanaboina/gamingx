import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      isCartOpen: false,
      isCheckoutOpen: false,
      
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      toggleCheckout: () => set((state) => ({ isCheckoutOpen: !state.isCheckoutOpen, isCartOpen: false })),
      
      addToCart: (product) => set((state) => {
        const existingItem = state.cartItems.find(item => item.id === product.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            isCartOpen: true
          };
        }
        return { 
          cartItems: [...state.cartItems, { ...product, quantity: 1 }],
          isCartOpen: true
        };
      }),
      
      removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== id)
      })),
      
      updateQuantity: (id, amount) => set((state) => ({
        cartItems: state.cartItems.map(item => {
          if (item.id === id) {
            const newQuantity = Math.max(1, item.quantity + amount);
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
      })),
      
      clearCart: () => set({ cartItems: [], isCartOpen: false, isCheckoutOpen: false }),
    }),
    {
      name: 'gamingx-cart-storage', // unique name for localStorage
    }
  )
);
