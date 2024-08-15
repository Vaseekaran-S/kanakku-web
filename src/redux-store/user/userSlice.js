
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "User",
    initialState: {
        user: "",
        isAuthenticated: false,
        userData: {}
    },
    reducers: {
        setAuthentication: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setUserData: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated || state.isAuthenticated;
            state.user = action.payload.email || state.user;
            state.userData = { ...state.userData, ...action.payload };
        }
    }
})

export const { setAuthentication, setUserData } = userSlice.actions
export default userSlice.reducer