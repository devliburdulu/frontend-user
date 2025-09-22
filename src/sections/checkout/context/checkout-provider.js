"use client";

import uniq from "lodash/uniq";
import PropTypes from "prop-types";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CheckoutContext } from "./checkout-context";

const initialState = {
  activeStep: 0,
  items: [],
  subTotal: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: null,
  totalItems: 0,
  checkoutData: null, // State to hold checkout-specific data
};

export function CheckoutProvider({ children }) {
  const router = useRouter();
  const [state, setState] = useState(initialState);

  // Function to handle cart calculations and state updates
  const onGetCart = useCallback(() => {
    const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    const subTotal = state.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const total = subTotal - state.discount + state.shipping;

    setState((prevState) => ({
      ...prevState,
      totalItems,
      subTotal,
      total,
    }));
  }, [state.items, state.discount, state.shipping]);

  // Function to add items to the cart
  const onAddToCart = useCallback(
    (newItem) => {
      setState((prevState) => {
        const updatedItems = prevState.items.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                colors: uniq([...item.colors, ...newItem.colors]),
                quantity: item.quantity + 1,
              }
            : item
        );

        if (!updatedItems.some((item) => item.id === newItem.id)) {
          updatedItems.push(newItem);
        }

        return {
          ...prevState,
          items: updatedItems,
        };
      });
      onGetCart(); // Recalculate totals
    },
    [onGetCart]
  );

  // Function to remove items from the cart
  const onDeleteCart = useCallback(
    (itemId) => {
      setState((prevState) => {
        const updatedItems = prevState.items.filter((item) => item.id !== itemId);
        return {
          ...prevState,
          items: updatedItems,
        };
      });
      onGetCart(); // Recalculate totals
    },
    [onGetCart]
  );

  // Function to handle steps in the checkout process
  const onBackStep = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      activeStep: prevState.activeStep - 1,
    }));
  }, []);

  const onNextStep = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      activeStep: prevState.activeStep + 1,
    }));
  }, []);

  const onGotoStep = useCallback((step) => {
    setState((prevState) => ({
      ...prevState,
      activeStep: step,
    }));
  }, []);

  // Function to handle quantity changes
  const onIncreaseQuantity = useCallback(
    (itemId) => {
      setState((prevState) => {
        const updatedItems = prevState.items.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item));
        return {
          ...prevState,
          items: updatedItems,
        };
      });
      onGetCart(); // Recalculate totals
    },
    [onGetCart]
  );

  const onDecreaseQuantity = useCallback(
    (itemId) => {
      setState((prevState) => {
        const updatedItems = prevState.items.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item));
        return {
          ...prevState,
          items: updatedItems,
        };
      });
      onGetCart(); // Recalculate totals
    },
    [onGetCart]
  );

  // Functions to apply discounts, shipping, and set billing info
  const onApplyDiscount = useCallback(
    (discount) => {
      setState((prevState) => ({
        ...prevState,
        discount,
      }));
      onGetCart(); // Recalculate totals
    },
    [onGetCart]
  );

  const onApplyShipping = useCallback(
    (shipping) => {
      setState((prevState) => ({
        ...prevState,
        shipping,
      }));
      onGetCart(); // Recalculate totals
    },
    [onGetCart]
  );

  const onCreateBilling = useCallback(
    (address) => {
      setState((prevState) => ({
        ...prevState,
        billing: address,
      }));
      onNextStep();
    },
    [onNextStep]
  );

  // Function to handle checkout-specific data
  const onAddCheckoutData = useCallback((data) => {
    setState((prevState) => ({
      ...prevState,
      checkoutData: data,
    }));

    //
  }, []);

  // Reset all state when checkout is completed
  const onReset = useCallback(() => {
    if (state.activeStep === 3) {
      // Assuming there are 3 steps, adjust as necessary
      setState(initialState);
      router.replace("/"); // Adjust the path as needed
    }
  }, [state.activeStep, router]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onAddToCart,
      onDeleteCart,
      onIncreaseQuantity,
      onDecreaseQuantity,
      onCreateBilling,
      onApplyDiscount,
      onApplyShipping,
      onBackStep,
      onNextStep,
      onGotoStep,
      onAddCheckoutData,
      onReset,
    }),
    [state, onAddToCart, onDeleteCart, onIncreaseQuantity, onDecreaseQuantity, onCreateBilling, onApplyDiscount, onApplyShipping, onBackStep, onNextStep, onGotoStep, onAddCheckoutData, onReset]
  );

  return <CheckoutContext.Provider value={memoizedValue}>{children}</CheckoutContext.Provider>;
}

CheckoutProvider.propTypes = {
  children: PropTypes.node,
};
