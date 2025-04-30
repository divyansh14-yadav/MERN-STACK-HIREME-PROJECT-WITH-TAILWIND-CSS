import FeatureCategory from "../../models/featureCategories-M/feature-categories-schema.js";


export const createFeatureCategories = async (req, res) => {

    try {
        const { featureCategoriesName } = req.body

        const feature_category_logo = req.file ? req.file.filename : null

        const feature_category_image = req.file ? req.file.filename : null

        const checkfeatureCat = await FeatureCategory.findOne({ featureCategoriesName })

        if (checkfeatureCat) {
            return res.status(400).json({
                message: "already have feature-categories"
            })
        }

        const newCategories = new FeatureCategory({
            featureCategoriesName, feature_category_logo, feature_category_image
        })

        await newCategories.save()

        res.status(200).json({
            message: "created a featured categories"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const getAllFeaturedCategories = async (req, res) => {

    try {

        const checkfeatureCat = await FeatureCategory.find({})

        if (checkfeatureCat.length > 0) {
            res.status(200).json({
                message: "all featured categories",
                featuredCategories: checkfeatureCat
            })
        }

        else {
            res.status(404).json({
                message: "not found any featured categories"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const updateFeatureCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { featureCategoriesName } = req.body;

        // Access files from req.files based on field names
        const feature_category_logo = req.files['feature_category_logo'] ? req.files['feature_category_logo'][0].filename : null;
        const feature_category_image = req.files['feature_category_image'] ? req.files['feature_category_image'][0].filename : null;

        // Update the feature category in the database
        const checkCategory = await FeatureCategory.findOneAndUpdate(
            { _id: categoryId },
            { featureCategoriesName, feature_category_logo, feature_category_image },
            { new: true }
        );

        // Send response
        res.status(200).json({
            message: "Feature category updated successfully",
            category: checkCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
