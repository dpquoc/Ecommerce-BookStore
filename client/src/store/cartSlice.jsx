import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
}

const storeInLocalStorage = (data) => {
  localStorage.setItem('cart', JSON.stringify(data));
}

const initialState = {
  itemsList: fetchFromLocalStorage(),
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.itemsList.findIndex((item) => item.isbn === newItem.isbn);

      if (existingItemIndex !== -1) {
        const existingItem = state.itemsList[existingItemIndex];
        existingItem.quantity++;
        existingItem.totalPrice = Math.round((existingItem.totalPrice + newItem.newprice) * 100) / 100;
        state.totalQuantity = state.totalQuantity + existingItem.quantity;
        state.totalAmount = Math.round((state.totalAmount + newItem.newprice) * 100) / 100;
        state.itemsList[existingItemIndex] = existingItem;
      } else {
        state.itemsList.push({
          isbn: newItem.isbn,
          title: newItem.title,
          newprice: newItem.newprice,
          quantity: newItem.quantity,
          totalPrice: newItem.newprice,
          img: newItem.img,
        });
        state.totalQuantity = state.totalQuantity + newItem.quantity;
        state.totalAmount = Math.round((state.totalAmount + newItem.newprice) * 100) / 100;
      }

      storeInLocalStorage(state.itemsList);
    },
    decreaseCartItem(state, action) {
      const isbn = action.payload;
      const existingItemIndex = state.itemsList.findIndex((item) => item.isbn === isbn);

      if (existingItemIndex !== -1) {
        const existingItem = state.itemsList[existingItemIndex];

        if (existingItem.quantity !== 1) {
          existingItem.quantity--;
          existingItem.totalPrice = Math.round((existingItem.totalPrice - existingItem.newprice) * 100) / 100;
          state.totalQuantity--;
          state.totalAmount = Math.round((state.totalAmount - existingItem.newprice) * 100) / 100;
          state.itemsList[existingItemIndex] = existingItem;
          storeInLocalStorage(state.itemsList);
        }
      }
    },
    removeFromCart(state, action) {
      const isbn = action.payload;
      state.itemsList = state.itemsList.filter((item) => {
        if (item.isbn === isbn) {
          state.totalQuantity -= item.quantity;
          state.totalAmount = Math.round((state.totalAmount - item.totalPrice) * 100) / 100;
        }
        return item.isbn !== isbn;
      });

      storeInLocalStorage(state.itemsList);
    },
    getCartTotal(state) {
      state.totalAmount = state.itemsList.reduce((cartTotal, cartItem) => {
        return cartTotal += cartItem.totalPrice;
      }, 0);
      state.totalQuantity = state.itemsList.reduce((totalQuantity, cartItem) => {
        return totalQuantity += cartItem.quantity;
      }, 0);
    },
    clearCart(state) {
      state.itemsList = [];
      storeInLocalStorage(state.itemsList);
    },
  },
});

export const { addToCart, decreaseCartItem, removeFromCart, getCartTotal, clearCart } = cartSlice.actions;
export default cartSlice;