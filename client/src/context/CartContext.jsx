import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // LOAD FROM LOCAL STORAGE
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
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

  // REMOVE FROM CART
  const removeFromCart = (id, size) => {
    setCartItems(
      cartItems.filter(
        (item) => !(item._id === id && item.selectedSize === size),
      ),
    );
  };

  // UPDATE QUANTITY
  const updateQuantity = (id, size, qty) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id && item.selectedSize === size
          ? { ...item, quantity: qty }
          : item,
      ),
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
