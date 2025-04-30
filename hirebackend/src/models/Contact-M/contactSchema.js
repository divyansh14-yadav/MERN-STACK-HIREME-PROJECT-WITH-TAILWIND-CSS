import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({

    firstName : {
        type : String
    },

    email : {
        type : String
    },

    subject : {
        type : String
    },

    message : {
        type : String
    }

},{timestamps : true})


const Contact = mongoose.model("Contact", contactSchema)

export default Contact