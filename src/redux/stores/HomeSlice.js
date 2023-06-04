import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: {}
}

export const HomeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        getApiBanners: (state, action) => {
            state.url = action.payload;
        },
    },
});

export const { getApiBanners } = HomeSlice.actions;

export default HomeSlice.reducer;
