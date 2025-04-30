import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


const url = process.env.MONGO_URL

export const connectDb = () => {

    try {
        mongoose.connect(url)
        
        console.log("connect to hireme-database");
        
    } catch (error) {
        console.log("not connect to database");
        
    }
}