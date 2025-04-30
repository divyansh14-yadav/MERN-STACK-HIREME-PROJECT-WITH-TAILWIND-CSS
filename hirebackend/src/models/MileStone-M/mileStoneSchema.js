import mongoose from "mongoose";


const mileStoneSchema = new mongoose.Schema({

    mileDescription: {
        type: String
    },

    mileAmount: {
        type: Number
    },

    mileStatus: {
        type: String,
        default: "Pending"
    },

    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskSubcategory"
    },

    loginAuthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },

    bidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BidTask"
    },

    taskCreaterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
    session_id: {
        type: String
    },

    bidUserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    }


}, { timestamps: true })


const MileStone = mongoose.model("MileStone", mileStoneSchema)

export default MileStone