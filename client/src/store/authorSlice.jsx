import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import {fetchAsyncAuthors , fetchAsyncAuthor} from './apiReq';

const initialState = {
    authorsCurrent: [],
    authorsStatus: STATUS.IDLE,
    authorCurrent: [],
    authorStatus: STATUS.IDLE
}

const authorSlice = createSlice({
    name: "author",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAsyncAuthors.pending, (state, action) => {
            state.authorsStatus = STATUS.LOADING;
        })

        .addCase(fetchAsyncAuthors.fulfilled, (state, action) => {
            state.authorsCurrent = action.payload;
            state.authorsStatus = STATUS.SUCCEEDED;
        })
        
        .addCase(fetchAsyncAuthors.rejected, (state, action) => {
            state.authorsStatus = STATUS.FAILED
        })

        .addCase(fetchAsyncAuthor.pending, (state, action) => {
            state.authorStatus = STATUS.LOADING;
        })

        .addCase(fetchAsyncAuthor.fulfilled, (state, action) => {
            state.authorCurrent = action.payload;
            state.authorStatus = STATUS.SUCCEEDED;
        })

        .addCase(fetchAsyncAuthor.rejected, (state, action) => {
            state.authorStatus = STATUS.FAILED;
        })
    }
});


export const getAllAuthors = (state) => state.author.authorsCurrent;
export const getAllAuthorsStatus = (state) => state.author.authorsStatus;
export const getAuthor = (state) => state.author.authorCurrent;
export const getAuthorStatus = (state) => state.author.authorStatus;

export default authorSlice;