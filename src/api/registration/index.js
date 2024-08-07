
import axios from "../axios"

// POST : SignUp Request
export const userSignUp = async (data) => {
    try {
        const response = await axios.post("/v1/auth", {
            name: data?.name,
            email: data?.email,
            mobile: data?.mobile,
            password: data?.password
        })
        console.log("Response: ", response);
        return response?.data;
    } catch (err) {
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}


// POST : Login Request
export const userLogin = async (data) => {
    try {
        const response = await axios.post("/v1/auth", {
            email: data?.email,
            password: data?.password
        })
        console.log("Response: ", response);
        return response?.data;
    } catch (err) {
        console.log("Error: ", err?.message);
        return { message: "Network Error", type: "error" };
    }
}
