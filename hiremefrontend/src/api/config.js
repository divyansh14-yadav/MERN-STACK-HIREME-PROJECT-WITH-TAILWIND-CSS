import axios from "axios";

const authConfig = axios.create({
    // baseURL: "http://192.168.1.117:8000"
    // baseURL: "https://hireback-1.onrender.com///"
    // baseURL: "https://hireback-1.onrender.com//api/v1"
    // baseURL :"https://hireback-1.onrender.com/api/v1"
    baseURL :"https://hireback-1.onrender.com/api/v1"

});

export default authConfig;


export const imageUrl = "http://192.168.1.117:8000"