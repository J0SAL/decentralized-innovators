import axios from "axios";

const BaseUrl = 'http://127.0.0.1:8000/';

const axiosInstance = axios.create({
    baseURL : BaseUrl,
    timeout : 10000,
    withCredentials:true
})

export default axiosInstance
export {BaseUrl}
