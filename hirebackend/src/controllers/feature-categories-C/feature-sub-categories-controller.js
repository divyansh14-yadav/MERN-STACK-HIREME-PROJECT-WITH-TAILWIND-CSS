import Feature_Sub_Category from "../../models/featureCategories-M/feature-sub-categories-schema.js";



export const ceateFeatureSubCategories = async (req, res) => {

    try {
        const { feature_SubCategories_name, featureCategory } = req.body

        const checkSubCategories = await Feature_Sub_Category.findOne({ feature_SubCategories_name })

        if (checkSubCategories) {
            return res.status(400).json({
                message: "already have featured-sub-categories"
            })
        }


        const newSubCate = new Feature_Sub_Category({
            feature_SubCategories_name, featureCategory
        })

        await newSubCate.save()

        res.status(200).json({
            message: "created a featured sub categories"
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const getFeaturedSubCategories = async (req, res) => {

    try {
        const { featureCategory } = req.params

        const checkSubCategories = await Feature_Sub_Category.find({ featureCategory }).populate({
            path: "featureCategory",
            select: "featureCategoriesName"
        })

        if (checkSubCategories) {
            res.status(200).json({
                message: "sub-Features-Categories",
                featured_SubCategories: checkSubCategories
            })
        }

        else {
            res.status(404).json({
                message: "not found any featured sub categories"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}