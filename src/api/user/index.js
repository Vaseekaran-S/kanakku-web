import axios from "../axios"

// GET: Get a user Data by email
export const getUser = async(email) => {
    try{
        if(!email) return {};
        const { data } = await axios.get(`/v1/users/${email}`)
        return data;
    }catch(err){
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}