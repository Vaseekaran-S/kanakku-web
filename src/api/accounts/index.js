import axios from "../axios"

// POST: Create a account
export const createAccount = async({ name, userId, balance, icon }) => {
    try{
        if(!name || !userId) return { message: "Bad Action", type: "error" };
        const { data } = await axios.post(`/v1/accounts`, { name, userId, balance, icon })
        return data;
    }catch(err){
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}

// GET: Get a user account data by its name
export const getAccountData = async(accountId) => {
    try{
        if(!accountId) return {};
        const { data } = await axios.get(`/v1/accounts/${accountId}`)
        return data;
    }catch(err){
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}

export const getAllAccounts = async(userId) => {
    try{
        if(!userId) return {};
        const { data } = await axios.get(`/v1/accounts/user/${userId}`)
        return data;
    }catch(err){
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}