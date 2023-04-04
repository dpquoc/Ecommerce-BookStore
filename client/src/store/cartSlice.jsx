import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload
      //check item is already exits
      const exitsItem = state.itemsList.find((item) => item.id === newItem.id)
      if (exitsItem) {
        exitsItem.quantity++
        exitsItem.totalPrice = Math.round((exitsItem.totalPrice + newItem.newprice) * 100) / 100;
      } else {
        state.itemsList.push({
          id: newItem.id,
          title: newItem.title,
          newprice: newItem.newprice,
          quantity: 1,
          totalPrice: newItem.newprice,
          cover: newItem.cover,
        })
        state.totalQuantity++
      }
    },
    decreaseCartItem(state, action) {
      const id = action.payload
      const exitstingItem = state.itemsList.find((item) => item.id === id)
      if (exitstingItem.quantity !== 1) {
        exitstingItem.quantity--
        exitstingItem.totalPrice = Math.round((exitstingItem.totalPrice - exitstingItem.newprice) * 100) / 100;
      }

    },
    removeFromCart(state, action) {
      const id = action.payload
      state.itemsList = state.itemsList.filter((item) => item.id !== id)
      state.totalQuantity--
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice
