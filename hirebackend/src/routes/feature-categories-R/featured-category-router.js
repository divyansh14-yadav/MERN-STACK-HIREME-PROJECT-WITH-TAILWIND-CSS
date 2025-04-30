import express from "express"
import { createFeatureCategories, getAllFeaturedCategories, updateFeatureCategory } from "../../controllers/feature-categories-C/feature-categories-controller.js"
import { upload } from "../../common/image.js"


const featuredCategoriesRouter = express.Router()


featuredCategoriesRouter.post("/create-feature-categories", createFeatureCategories)

featuredCategoriesRouter.get("/all-featured-categories", getAllFeaturedCategories)

featuredCategoriesRouter.put("/update-category/:categoryId",upload.fields([
    { name: 'feature_category_logo', maxCount: 1 }, // Upload for logo
    { name: 'feature_category_image', maxCount: 1 } // Upload for image
  ]), updateFeatureCategory)


export default featuredCategoriesRouter