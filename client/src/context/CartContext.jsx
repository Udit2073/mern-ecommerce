import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Get user-specific cart key
  const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? `cart_${user._id}` : "cart_guest";
  };

  // Load cart for current user
  const loadUserCart = () => {
    const savedCart = localStorage.getItem(getCartKey());
    return savedCart ? JSON.parse(savedCart) : [];
  };

  // State
  const [cartItems, setCartItems] = useState(loadUserCart);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem(getCartKey(), JSON.stringify(cartItems));
  }, [cartItems]);

  // Reload cart when user logs in
  const syncCart = () => {
    setCartItems(loadUserCart());
  };

  // Add To Cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) =>
        item._id === product._id && item.selectedSize === product.selectedSize,
    );

    if (existingItem) return;

    setCartItems([
      ...cartItems,
      {
        ...product,
        quantity: 1,
      },
    ]);
  };

  // Remove From Cart
  const removeFromCart = (id, size) => {
    setCartItems(
      cartItems.filter(
        (item) => !(item._id === id && item.selectedSize === size),
      ),
    );
  };

  // Update Quantity
  const updateQuantity = (id, size, qty) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id && item.selectedSize === size
          ? { ...item, quantity: qty }
          : item,
      ),
    );
  };

  // Clear current cart UI only
  const clearCart = () => {
    setCartItems([]);
  };

  const clearCartUI = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        clearCartUI,
        syncCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
