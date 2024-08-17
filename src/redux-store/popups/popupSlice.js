
import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
    name: "Popup",
    initialState: {
        isLoaderOn: false,
        alert: {
            alertStatus: false,
            alertMessage: "",
            alertType: ""
        }
    },
    reducers: {
        setLoaderStatus: (state, action) => {
            state.isLoaderOn = action.payload
        },
        setPopupAlert: (state, action) => {
            state.alert =  { ...state.alert, ...action.payload }
        }
    }
})

export const { setLoaderStatus, setPopupAlert } = popupSlice.actions
export default popupSlice.reducer