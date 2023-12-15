import axios from "axios";
const axiosConfig = axios.create({
  baseURL: "http://localhost:5000",
});

// axiosConfig.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default axiosConfig;
