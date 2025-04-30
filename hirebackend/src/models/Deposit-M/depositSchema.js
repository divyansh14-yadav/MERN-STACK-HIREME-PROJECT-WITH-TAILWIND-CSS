import mongoose from "mongoose";

const depositSchema = new mongoose.Schema({

    loginAuthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },

    depositAmountUSD: {
        type: Number
    },

    USDTotalAmount: {
        type: Number
    },

    IndianTotalAmout: {
        type: Number
    },

    process_charge: {
        type: Number
    },

    session_id: {
        type: String
    },

    status: {
        type: String,
        default: "pending"
    },

    milestoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MileStone"
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskSubcategory"
    },

    mileCreatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
    bidUserId : {
          type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    }


}, { timestamps: true })


const Deposit = mongoose.model("Deposit", depositSchema)

export default Deposit