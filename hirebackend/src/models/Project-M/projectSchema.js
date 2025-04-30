import mongoose from "mongoose";


const projectSchema = new mongoose.Schema({

    order_quotes: {
        type: String
    },

    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    },

    authId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },

    serviceAuthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },

    messages: [
        {

            message: {
                type: String
            },
            messagerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Auth"
            },

            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    uploadfiles: [
        {
            quotefileName: {
                type: Array
            },
            uploaderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Auth"
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    dead_line: {
        type: String,
        default: "Expected deadline will come after accepting the order."
    },

    status: {
        type: String,
        default: "Pending"
    }

}, { timestamps: true })


const Project = mongoose.model("Project", projectSchema)

export default Project