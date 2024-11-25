import axios from "../axios"

// GET: Get a user account data by its name
export const getAccountData = async (accountId) => {
    try {
        if (!accountId) return {};
        const { data } = await axios.get(`/v1/accounts/${accountId}`)
        return data || {};
    } catch (err) {
        console.log("Error: ", err?.message);
        return {};
    }
}

// GET: Get a user account data by its url
export const getAccountByUrl = async (userId, accountUrl) => {
    try {
        if (!userId || !accountUrl) return {};
        const { data } = await axios.get(`/v1/accounts/${userId}/${accountUrl}`)
        return data;
    } catch (err) {
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}

// GET: Get all accounts data of a user
export const getAllAccounts = async (userId) => {
    try {
        if (!userId) return [];
        const { data } = await axios.get(`/v1/accounts/user/${userId}`)
        return data;
    } catch (err) {
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}

// POST: Create a account
export const createAccount = async ({ name, userId, balance, icon }) => {
    try {
        if (!name || !userId) return { message: "Bad Action", type: "error" };
        const { data } = await axios.post(`/v1/accounts`, { name, userId, balance, icon })
        return data;
    } catch (err) {
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}

// PUT: Update a account
export const updateAccount = async ({ userId, name, _id, balance, icon }) => {
    try {
        if (!name || !_id) return { message: "Bad Action", type: "error" };
        const { data } = await axios.put(`/v1/accounts/${_id}`, { userId, name, balance, icon })
        return data;
    } catch (err) {
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}

// PATCH: Change the account type
export const changeAccountType = async ({ _id, type }) => {
    try {
        if (!type || !_id) return { message: "Bad Action", type: "error" };
        const { data } = await axios.patch(`/v1/accounts/${_id}/change-type`, { type })
        return data;
    } catch (err) {
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}

// DELETE: Delete an account by its Id
export const deleteAccountById = async(_id) => {
    try {
        if (!_id) return { message: "Bad Action", type: "error" };
        const { data } = await axios.delete(`/v1/accounts/${_id}`)
        return data;
    } catch (err) {
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}