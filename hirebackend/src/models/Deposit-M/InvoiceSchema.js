import mongoose from "mongoose";


const invoiceSchema = new mongoose.Schema({


    milestoneId: { type: mongoose.Schema.Types.ObjectId, ref: "MileStone" },
    invoiceNumber: String,
    status: String,
    amount: Number,
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
    freelancer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },

    taskTitle: String,
    createdAt: Date,
    paidAt: Date
});

const Invoice = mongoose.model("Invoice", invoiceSchema)

export default Invoice