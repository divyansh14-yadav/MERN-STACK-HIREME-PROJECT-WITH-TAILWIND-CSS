import Blog from "../../models/Blog-M/latest-blog-schema.js";
import FeatureCategory from "../../models/featureCategories-M/feature-categories-schema.js";
import Service from "../../models/Service-M/serviceSchema.js";
import TaskSubcategory from "../../models/Task-M/Task-subcategory/task-subcategory-schema.js";




// export const Details_home_page = async (req, res) => {

//     try {

//         const checkBlog = await Blog.find({}).sort({sort : 1}).sort({ createdAt: -1 }).limit(3)

//         const checkFeaturedCategories = await FeatureCategory.find({})

//         const checkService = await Service.find({}).limit(3)
//         .populate({
//             path : "sub_categoryId",
//             select : "feature_SubCategories_name"
//         })
//         .populate({
//             path : "authId",
//             select : "firstName lastName"
//         })
//         .populate({
//             path : "categoryId",
//             select : "featureCategoriesName"
//         })

//         if (checkBlog.length > 0 || checkFeaturedCategories.length > 0 || checkService.length > 0) {

//             res.status(200).json({
//                 message: "Details on home page",
//                 feature_categories: checkFeaturedCategories,
//                 latestBlogs: checkBlog,
//                 popularService : checkService
//             })

//         }

//         else {
//             res.status(404).json({
//                 message: "not found"
//             })
//         }

//     } catch (error) {
//         res.status(500).json({
//             message: "internal server error"
//         })
//     }
// }




export const Details_home_page = async (req, res) => {

    try {

        const checkBlog = await Blog.find({}).sort({ sort: 1 }).sort({ createdAt: -1 }).limit(3)

        const services = await Service.find({}).populate({
            path: "authId",
            select: "firstName lastName authProfile"

        }).populate('ratings.reviewerId', 'firstName').limit(4).select("-about_Gig -requirement -categoryId -sub_categoryId")


        const task = await TaskSubcategory.find({}).populate({
            path: "authId",
            select: "firstName lastName authProfile"

        }).populate('ratings.reviewerId', 'firstName').limit(5)


        const checkFeaturedCategories = await FeatureCategory.find({})

        const popular_service = await FeatureCategory.find({})


        if (checkBlog.length > 0 || checkFeaturedCategories.length > 0 || popular_service.length > 0 || services.length > 0 || task.length > 0) {

            //jisme image hogi uska he data milega start
            const filteredPopularService = popular_service.filter(service => service.feature_category_image !== null);

            const filteredPopularCategory = checkFeaturedCategories.filter(category => category.feature_category_logo !== null);
            //jisme image hogi uska he data milega end


            // rating popular service start
            const servicesWithAverageRating = services.map(service => {

                let totalStars = 0;
                let totalRatings = service.ratings.length;

                service.ratings.forEach(rating => {
                    totalStars += rating.rating;
                });

                const averageRating = service.ratings.length > 0 ? totalStars / service.ratings.length : 0;

                return {
                    ...service.toObject(),
                    averageRating,
                    totalRatings
                };
            })

            servicesWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);  //sort kara rating ko decending order mee
            // rating popular service end


            // rating popular task start
            const taskWithAverageRating = task.map(task => {

                let totalStars = 0;
                let totalRatings = task.ratings.length;

                task.ratings.forEach(rating => {
                    totalStars += rating.rating;
                });

                const averageRating = task.ratings.length > 0 ? totalStars / task.ratings.length : 0;

                return {
                    ...task.toObject(),
                    averageRating,
                    totalRatings
                };
            })

            taskWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);  //sort kara rating ko decending order mee
            // rating popular task end


            // Get client reviews wala array show start
            const checkClientReviews = await Service.find({}).populate('ratings.reviewerId', 'firstName lastName authProfile');

            const servicesWithRatings = checkClientReviews.map(service => {
                const ratings = service.ratings;
                let averageRating = 0;

                if (ratings && ratings.length > 0) {
                    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
                    averageRating = totalRating / ratings.length;
                }

                if (ratings.length > 0) {
                    return {
                        ratings: ratings,
                        averageRating: averageRating
                    };
                }

                return null;
            }).filter(service => service !== null);
            // Get client reviews wala array show end
            
            servicesWithRatings.sort((a, b) => b.averageRating - a.averageRating); 

            res.status(200).json({
                message: "Details on home page",
                feature_categories: filteredPopularCategory,
                latestBlogs: checkBlog,
                popularService: filteredPopularService,
                popular_rating_services: servicesWithAverageRating,
                popular_rating_tasks: taskWithAverageRating,
                clientReviews: servicesWithRatings
            })
        }
        else {
            res.status(404).json({
                message: "not found"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}