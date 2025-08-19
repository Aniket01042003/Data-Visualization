import axios from "axios"


<<<<<<< HEAD
// export const API_BASE_URL = "http://localhost:5000"
export const API_BASE_URL = "https://data-visualization-tdik.onrender.com";
=======
export const API_BASE_URL = "https://data-visualization-tdik.onrender.com"
>>>>>>> c2d4f6b5f0d3f0d48bb3bcff6794acd2fd896d85

const jwt = localStorage.getItem("jwt")

export const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${jwt}`,
        "Content-Type":"application/json"
    }

})
