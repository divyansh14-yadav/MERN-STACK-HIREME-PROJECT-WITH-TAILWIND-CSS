import mongoose from "mongoose";


const featureSubCategoriesSchema = new mongoose.Schema({

    feature_SubCategories_name : {
        type : String
    },

    featureCategory : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Feature_Category"
    }

},{timestamps : true})


const Feature_Sub_Category = mongoose.model("Feature_Sub_Category", featureSubCategoriesSchema)

export default Feature_Sub_Category