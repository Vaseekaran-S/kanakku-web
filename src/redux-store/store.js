import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import popupReducer from "./popups/popupSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        popup: popupReducer
    }
})

export default store