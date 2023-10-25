import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems = addItem(current(state).cartItems, action.payload);
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    removeCartItem: (state, action) => {
      state.cartItems = removeFromCartItem(
        current(state).cartItems,
        action.payload
      );
    },
    incrementItemQuantity: (state, action) => {
      state.cartItems = incrementItem(current(state).cartItems, action.payload);
    },
    decrementItemQuantity: (state, action) => {
      state.cartItems = decrementItem(current(state).cartItems, action.payload);
    },
  },
});

export const {
  addItemToCart,
  setIsCartOpen,
  removeCartItem,
  incrementItemQuantity,
  decrementItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

// Actions

const addItem = (cartItems, itemToAdd) => {
  const isItemExist = cartItems.find((item) => item.id === itemToAdd.id);
  if (isItemExist) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const incrementItem = (cartItems, itemToIncrementId) => {
  return cartItems.map((cartItem) => {
    if (cartItem.id === itemToIncrementId) {
      return {
        ...cartItem,
        quantity: cartItem.quantity + 1,
      };
    }
    return cartItem;
  });
};

const decrementItem = (cartItems, itemToDecrementId) => {
  const itemToDecrement = cartItems.find(
    (item) => item.id === itemToDecrementId
  );

  if (itemToDecrement.quantity > 1) {
    return cartItems.map((cartItem) => {
      if (itemToDecrement.id === cartItem.id) {
        return {
          ...itemToDecrement,
          quantity: itemToDecrement.quantity - 1,
        };
      }
      return cartItem;
    });
  }
  return cartItems.filter((item) => item.id !== itemToDecrementId);
};

const removeFromCartItem = (cartItems, itemToRemoveId) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToRemoveId);
};
