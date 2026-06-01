import axios from "axios";

const API = axios.create({
    baseURL: "https://mern-ecommerce-8saf.onrender.com/api",
});

export default API;