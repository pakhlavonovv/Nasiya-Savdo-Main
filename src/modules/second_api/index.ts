import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://solihov.uz"
});


export default axiosInstance