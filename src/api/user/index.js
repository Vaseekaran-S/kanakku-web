import axios from "../axios"

// GET: Get a user Data by email
export const getUser = async(email) => {
    try{
        if(!email) return { message: "Something wrong at your side!", type: "error"};
        const { data } = await axios.get(`/v1/users/${email}`)
        return data;
    }catch(err){
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}

// PUT: Update User Data
export const updateUserData = async({_id, data}) => {
    try{
        if(!_id || !data) return { message: "Something wrong at your side!", type: "error"};
        const { data: response } = await axios.put(`/v1/users/${_id}`, data)
        return response;
    }catch(err){
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}