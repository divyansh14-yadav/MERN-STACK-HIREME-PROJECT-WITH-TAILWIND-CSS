import axios from "axios";

const authConfig = axios.create({
    // baseURL: "http://192.168.1.117:8000"
    // baseURL: "http://192.168.1.2:8000///"
    // baseURL: "http://192.168.1.2:8000//api/v1"
    // baseURL :"http://192.168.1.2:8000/api/v1"
    // baseURL :"http://192.168.1.2:8000/api/v1
        baseURL :"http://192.168.1.2:8000/api/v1"



});

export default authConfig;


export const imageUrl = "http://192.168.1.117:8000"