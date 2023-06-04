import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    isRegister: false
}

export const ModalAccountSlide = createSlice({
    name: "modalAccountSlide",
    initialState,
    reducers: {
        openModalAccount: (state, action) => {
            state.visible = action.payload.visible;
            state.isRegister = action.payload.isRegister;
        },
        closeModalAccount: (state, action) => {
            state.visible = action.payload.visible;
        },
    },
});

export const { openModalAccount, closeModalAccount } = ModalAccountSlide.actions;

export default ModalAccountSlide.reducer;
