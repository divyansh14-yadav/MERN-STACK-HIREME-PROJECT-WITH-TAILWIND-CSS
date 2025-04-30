import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({

    loginAuthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },

    amountUSD: {
        type: Number
    },

    USDTotalAmount: {
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
        default: "unPaid"
    },
    IndianTotalAmout: {
        type: Number
    },

    razorpay_order_id: {
        type : String
    },

    razorpay_payment_id: {
        type : String
    } 


}, { timestamps: true })


const Wallet = mongoose.model("Wallet", walletSchema)

export default Wallet