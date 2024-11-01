import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://auth.solihov.uz"
});
axiosInstance.interceptors.request.use((config)=>{
    const access_token:string | null = localStorage.getItem("access_token")
    if (access_token) {
        config.headers['Authorization'] = `${access_token}`
    }
    return config   
})



export default axiosInstance