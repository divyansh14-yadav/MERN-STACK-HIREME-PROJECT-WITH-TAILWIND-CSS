import mongoose from "mongoose";


const featureCateSchema = new mongoose.Schema({

    featureCategoriesName : {
        type : String
    },

    feature_category_logo : {
        type : String
    },

    feature_category_image : {
        type : String
    }

}, {timestamps : true})


const FeatureCategory = mongoose.model("Feature_Category", featureCateSchema)

export default FeatureCategory