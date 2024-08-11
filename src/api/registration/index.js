
import axios from "../axios"

// POST: SignUp Request
export const userSignUp = async (data) => {
    try {
        const response = await axios.post("/v1/auth/signup", {
            name: data?.name,
            email: data?.email,
            mobile: data?.mobile,
            password: data?.password
        })
        return response?.data;
    } catch (err) {
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}


// POST: Login Request
export const userLogin = async (data) => {
    try {
        const response = await axios.post("/v1/auth/login", {
            email: data?.email,
            password: data?.password
        })
        return response?.data;
    } catch (err) {
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}


// GET: Verify Token
export const verifyToken = async () => {
    try{
        const token = localStorage.getItem("kanakku-user-token");
        if(!token) return false;
        const response = await axios.get("/v1/auth/token", { headers: { Authorization: token } })
        console.log(response);
        
        return response?.data?.isTokenValid;
    }catch(err){
        console.log("Error: ", err?.message);
        return false;
    }
}


// POST: Verify User Email Address
export const verifyEmailToken = async (token) => {
    try{
        if(!token) return false;
        const response = await axios.post("/v1/auth/verify-email-token", { token })
        console.log(response);
        
        return response?.data?.isTokenValid;
    }catch(err){
        console.log("Error: ", err?.message);
        return false;
    }
}