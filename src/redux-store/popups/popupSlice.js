
import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
    name: "Popup",
    initialState: {
        isLoaderOn: false
    },
    reducers: {
        setLoaderStatus: (state, action) => {
            state.isLoaderOn = action.payload
        }
    }
})

export const { setLoaderStatus } = popupSlice.actions
export default popupSlice.reducer