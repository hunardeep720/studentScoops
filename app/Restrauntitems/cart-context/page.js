"use client";
import React, { createContext, useContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // State to hold the items in the cart
  const [cartItems, setCartItems] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);

  // Function to add an item to the cart
  const addToCart = (item,restaurant) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find((cartItem) => cartItem.item_id === item.item_id);
      if (existingItem) {
        // If the item exists, log a message and return the previous items
        console.log("Item already exists in cart:", item);
        return prevItems; // Item already exists, do not add again
      } else {
        // If the item does not exist, log a message and add the new item with quantity 1
        console.log("Adding new item to cart:", item);
        setRestaurantInfo(restaurant)
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart by item_id
  const removeFromCart = (item_id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.item_id !== item_id));
  };

  // Calculate the number of items in the cart
  const cartCounter = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartCounter, restaurantInfo }}>
      {children}
    </CartContext.Provider>
  );
};
