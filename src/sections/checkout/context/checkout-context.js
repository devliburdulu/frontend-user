"use client";

import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({ children }) {
  const [checkoutResponse, setCheckoutResponse] = useState(null);

  return <CheckoutContext.Provider value={{ checkoutResponse, setCheckoutResponse }}>{children}</CheckoutContext.Provider>;
}

export function useCheckoutContext() {
  return useContext(CheckoutContext);
}
