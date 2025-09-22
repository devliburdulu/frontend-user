"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { getCartForward } from "src/rest/Cart";
import Cookies from "js-cookie";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const TOKEN = Cookies.get("accessToken");

        if (!TOKEN) return;
        const res = await getCartForward(TOKEN);
        const itemCountFromAPI = res?.data?.total_item_count || 0;
        setItemCount(itemCountFromAPI);
        localStorage.setItem("itemCount", itemCountFromAPI);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const storedItemCount = parseInt(localStorage.getItem("itemCount"), 10);
    if (!isNaN(storedItemCount)) {
      setItemCount(storedItemCount);
    }

    fetchCartItems();
  }, []);

  const handleLogoutItem = () => {
    localStorage.removeItem("itemCount");
    setItemCount(0);
  };

  //

  return <CartContext.Provider value={{ itemCount, setItemCount, handleLogoutItem }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
