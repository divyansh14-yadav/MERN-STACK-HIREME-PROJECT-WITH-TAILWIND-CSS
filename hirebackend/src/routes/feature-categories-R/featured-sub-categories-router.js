import express from "express"
import { ceateFeatureSubCategories, getFeaturedSubCategories } from "../../controllers/feature-categories-C/feature-sub-categories-controller.js"

const featureSubCategoriesRouter = express.Router()


featureSubCategoriesRouter.post("/create-feature-sub-categories", ceateFeatureSubCategories)

featureSubCategoriesRouter.get("/found-feature-sub-categories/:featureCategory", getFeaturedSubCategories)

export default featureSubCategoriesRouter 