import { createContext, useContext, useEffect, useState } from 'react';
import { getCart, addCartItem as addItem, updateCartItem as updateItem, removeCartItem as removeItem } from '../services/cartService';
import { getWishlist } from '../services/authService';
import { useAuth } from '../hooks/useAuth';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCartAndWishlist = async () => {
      if (!token || !user) {
        setCart([]);
        setWishlist([]);
        return;
      }
      setIsLoading(true);
      try {
        const [cartItems, wishlistItems] = await Promise.all([getCart(token), getWishlist(token)]);
        setCart(cartItems);
        setWishlist(wishlistItems);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCartAndWishlist();
  }, [token, user]);

  const addCartItem = async (productId, quantity = 1) => {
    const item = await addItem(productId, quantity, token);
    setCart((prev) => {
      const exists = prev.find((entry) => entry.product._id === item.product._id);
      if (exists) {
        return prev.map((entry) => (entry.product._id === item.product._id ? item : entry));
      }
      return [...prev, item];
    });
    return item;
  };

  const updateCartItem = async (itemId, quantity) => {
    const updated = await updateItem(itemId, quantity, token);
    setCart((prev) => prev.map((entry) => (entry._id === updated._id ? updated : entry)));
    return updated;
  };

  const removeCartItem = async (itemId) => {
    await removeItem(itemId, token);
    setCart((prev) => prev.filter((entry) => entry._id !== itemId));
  };

  const refreshWishlist = async () => {
    if (!token) return;
    const items = await getWishlist(token);
    setWishlist(items);
  };

  return (
    <CartContext.Provider value={{ cart, wishlist, isLoading, addCartItem, updateCartItem, removeCartItem, refreshWishlist }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
