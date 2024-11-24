import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "api/user";

const fetchUserData = createAsyncThunk(
    'user/userData',
    async (email) => {
        const response = await getUser(email)
        return response
    }
)

const userSlice = createSlice({
    name: "User",
    initialState: {
        userMail: "",
        isAuthenticated: false,
        userData: {}
    },
    reducers: {
        setUserMail: (state, action) => {
            state.userMail = action.payload
        },
        setAuthentication: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setUserData: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated || state.isAuthenticated;
            state.user = action.payload.email || state.user;
            state.userData = { ...state.userData, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.userData = action.payload
        })
    }
})

export const { setAuthentication, setUserData, setUserMail } = userSlice.actions
export { fetchUserData }
export default userSlice.reducer