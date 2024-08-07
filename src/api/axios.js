
import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_API || "http://localhost:5001/api/";
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

let instance = axios.create({
    baseURL: baseUrl
})
instance.defaults.headers.common['x-user-timezone'] = userTimeZone;

export default instance