import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAccountData, getAllAccounts } from 'api/accounts';

const refreshAccount = createAsyncThunk(
    'accounts/update',
    async (accountId) => {
        if (!accountId) return {}
        const response = await getAccountData(accountId)
        return response;
    }
)

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
            }).addCase(refreshAccount.fulfilled, (state, action) => {
                const accountId = action.payload?._id;
                const accounts = state.data?.filter(account => account._id !== accountId)
                state.data = [...accounts, action.payload]
            })
    }
})

export const selectAccountByUrl = (accounts, accountUrl) => accounts.data.find(account => account.url === accountUrl) || {};

export { fetchAccounts, refreshAccount };
export default accountsSlice.reducer