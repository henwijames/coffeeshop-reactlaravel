import axios from "axios";

const API_BASE_URL = window.env.API_BASE_URL || "";

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export default axiosClient;
