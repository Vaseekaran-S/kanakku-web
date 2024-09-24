import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllAccounts } from 'api/accounts';

const fetchAccounts = createAsyncThunk(
    'accounts/fetchAccounts',
    async (accountId) => {
        const response = await getAllAccounts(accountId);
        return response;
    }
);

const accountsSlice = createSlice({
    name: "accounts",
    initialState: {
        isLoading: true,
        data: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAccounts.pending, (state) => { state.isLoading = true })
            .addCase(fetchAccounts.rejected, (state) => { state.isLoading = false })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
    }
})

export const selectAccountByUrl = (accounts, accountUrl) => accounts.data.find(account => account.url === accountUrl) || {};

export { fetchAccounts };
export default accountsSlice.reducer