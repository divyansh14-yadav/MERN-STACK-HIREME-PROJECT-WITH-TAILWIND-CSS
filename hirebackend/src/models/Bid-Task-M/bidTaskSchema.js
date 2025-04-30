import mongoose from "mongoose";

const bidTaskSchema = new mongoose.Schema({

    loginAuthId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Auth'
    },

    taskId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'TaskSubcategory'
    },

    description : {
        type : String
    },

    minimalRate : {
        type : Number
    },

    deliveryTime : {
        type : Number
    },

    deliveryDays : {
        type : String,
        default : "Days",
        enum : ["Days", "Hours"]
    },

    TaskCreaterId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Auth"
    },

    status: {
        type: String,
        default: "Pending"
    },

    confirmation_bid_user : {
        type : String,
        default : "Cancle"
    },
    fcmToken: {
        type: String,
      },
},{timestamps : true})


const BidTask = mongoose.model("BidTask", bidTaskSchema)

export default BidTask