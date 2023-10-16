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
  },
});

export const { addItemToCart, setIsCartOpen, removeCartItem } =
  cartSlice.actions;
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

const removeFromCartItem = (cartItems, itemToRemoveId) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToRemoveId);
};
