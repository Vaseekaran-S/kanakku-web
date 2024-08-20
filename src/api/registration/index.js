
import axios from "../axios"

// POST: SignUp Request
export const userSignUp = async (data) => {
    try {
        const response = await axios.post("/v1/auth/signup", {
            name: data?.name,
            email: data?.email,
            mobile: data?.mobile,
            password: data?.password,
            type: data?.type
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
export const verifyToken = async (token) => {
    try{
        if(!token) return false;
        const { data } = await axios.get("/v1/auth/token", { headers: { Authorization: token } })
        return data;
    }catch(err){
        console.log("Error: ", err?.message);
        return false;
    }
}


// POST: Verify User Email Address
export const verifyEmailToken = async (token) => {
    try{
        if(!token) return false;
        const { data } = await axios.post("/v1/auth/verify-email-token", { token })
        console.log(data);
        
        return data;
    }catch(err){
        console.log("Error: ", err?.message);
        return false;
    }
}

// POST: Forgot Password APi
export const forgotPassword = async(email) => {
    try{
        if(!email) return { message: "Network Error", type: "error" };
        const { data } = await axios.post("/v1/auth/forgot-password", { email })

        return data;
    }catch(err){
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}

// POST: Reset Password APi
export const resetPassword = async({ token, password }) => {
    try{
        if(!token || !password) return { message: "Network Error", type: "error" };
        const { data } = await axios.post("/v1/auth/reset-password", { token, password })
        return data;
    }catch(err){
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}