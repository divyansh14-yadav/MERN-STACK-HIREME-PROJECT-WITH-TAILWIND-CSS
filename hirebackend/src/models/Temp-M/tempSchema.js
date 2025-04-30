import mongoose from "mongoose";

const tempSchema = new mongoose.Schema({

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String
    },

    password: {
        type: String
    },

    confirm_password: {
        type: String
    }
    

}, { timestamps: true })


const Temp = mongoose.model("Temp", tempSchema)


export default Temp