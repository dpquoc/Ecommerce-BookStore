import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { fetchAsyncProducts, fetchAsyncProductSingle } from './apiReq';

const initialState = {
    products: [],
    productsStatus: STATUS.IDLE,
    productSingle: [],
    productSingleStatus: STATUS.IDLE
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearProductSingle: (state, action) => {
            state.productSingle = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncProducts.pending, (state, action) => {
                state.productsStatus = STATUS.LOADING;
            })

            .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.productsStatus = STATUS.SUCCEEDED;
            })

            .addCase(fetchAsyncProducts.rejected, (state, action) => {
                state.productsStatus = STATUS.FAILED
            })

            .addCase(fetchAsyncProductSingle.pending, (state, action) => {
                state.productSingleStatus = STATUS.LOADING;
            })

            .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
                state.productSingle = action.payload;
                state.productSingleStatus = STATUS.SUCCEEDED;
            })

            .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
                state.productSingleStatus = STATUS.FAILED;
            })
    }
});

export const { clearProductSingle } = productSlice.actions;
export const getAllProducts = (state) => state.product.products;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productSingle;
export const getSingleProductStatus = (state) => state.product.productSingleStatus;

export default productSlice;