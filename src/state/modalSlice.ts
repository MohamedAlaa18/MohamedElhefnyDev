import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState } from '../types/types';

const initialState: ModalState = {
    isOpen: false,
    currentImageIndex: 0,
    screenshots: [],
    isLoading: false,
    // Initialize other properties
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<number>) => {
            state.isOpen = true;
            state.currentImageIndex = action.payload;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        // Add other reducers
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
