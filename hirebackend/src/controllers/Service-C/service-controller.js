import Draft from "../../models/Draft-M/draftSchema.js";
import Portfolio from "../../models/Portfolio-M/portfolioSchema.js";
import Service from "../../models/Service-M/serviceSchema.js";


export const createService = async (req, res) => {

    try {
        const { authId } = req.params

        const { sub_categoryId, title, description, categoryId, about_Gig, requirement, searchTags, in_publish, FAQ, Basic_price, Standard_price, Premium_price } = req.body

        // const serviceImage = req.files.map(({ filename }) => `${filename}`) 

        const serviceImage = req.files && req.files.length > 0
            ? req.files.map(({ filename }) => filename)
            : [];


        const checkService = await Service.findOne({ title })

        if (checkService) {
            return res.status(400).json({
                message: "already have this title of service"
            })
        }


        const isComplete = sub_categoryId && title && description && categoryId && about_Gig && requirement && searchTags && in_publish && FAQ.length && Basic_price.length && Standard_price.length && Premium_price.length;

        if (isComplete) {

            const newService = new Service({
                sub_categoryId, title, description, authId, categoryId, about_Gig, requirement, searchTags, serviceImage, in_publish, FAQ, Basic_price, Standard_price, Premium_price
            })

            await newService.save()

            // if (in_publish === "public") {
            //     await Draft.deleteOne({ authId, title });
            // }

            res.status(200).json({
                message: "created a new service",
                services: newService
            })
        }

        else {

            const newDraftService = new Draft({
                sub_categoryId, title, description, authId, categoryId, about_Gig, requirement, searchTags, serviceImage, FAQ, Basic_price
            });

            await newDraftService.save();

            return res.status(200).json({
                message: "Service saved as draft",
                draftService: newDraftService
            });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// single service
export const getSingleService = async (req, res) => {

    try {

        const { serviceId } = req.params

        const checkService = await Service.findById({ _id: serviceId }).populate('ratings.reviewerId', 'firstName lastName authProfile')
            .populate({
                path: "sub_categoryId",
                select: "feature_SubCategories_name"
            }).populate({
                path: "authId",
                select: "firstName lastName authProfile description tagline state"
            }).populate({
                path: "categoryId",
                select: "featureCategoriesName"
            })



        // Calculate average rating for the service
        let totalStars = 0;
        let totalRatings = checkService?.ratings?.length;
        let totalReview = checkService?.ratings?.filter(rating => rating.review).length;



        checkService?.ratings?.forEach(rating => {
            totalStars += rating.rating;
        });


        const averageRating = totalRatings > 0 ? totalStars / totalRatings : 0;

        //calculate avg rating
        const serviceWithRating = {
            ...checkService?.toObject(),
            averageRating,
            totalRatings: totalStars,
            totalReview
        };


        if (checkService) {
            res.status(200).json({
                message: "service are...",
                single_service: serviceWithRating,
            })
        }
        else {
            res.status(404).json({
                message: "not found service"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}


// sub cate according service
export const perticular_sub_cat_service = async (req, res) => {

    try {

        const { sub_categoryId } = req.params;
        const { bestRating, bestReviewed, title, minRating, maxRating } = req.query;

        let services = await Service.find({ sub_categoryId }).populate('ratings.reviewerId', 'firstName')
            .select("-about_Gig -requirement")
            .populate({
                path: "sub_categoryId",
                select: "feature_SubCategories_name"
            })
            .populate({
                path: "authId",
                select: "firstName lastName authProfile"
            }).populate({
                path: "categoryId",
                select: "featureCategoriesName"
            }).sort({ createdAt: -1 });

        if (!services || services.length === 0) {
            return res.status(400).json({
                message: "No services found for this category"
            });
        }

        // search ke ley 
        if (title) {
            services = services.filter(service => service.title && service.title.toLowerCase().includes(title.toLowerCase()));
        }

        let filteredServices = [];

        if (bestRating) {
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
            });

            filteredServices = servicesWithAverageRating.filter(service => service.averageRating > 0);
            filteredServices.sort((a, b) => b.averageRating - a.averageRating);

        } else {
            filteredServices = services.map(service => {
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
            });
        }

        // Apply the minRating and maxRating filter 
        if (minRating || maxRating) {
            filteredServices = filteredServices.filter(service => {
                const averageRating = service.averageRating;
                if (minRating && maxRating) {
                    return averageRating >= parseFloat(minRating) && averageRating <= parseFloat(maxRating);
                }
                if (minRating) {
                    return averageRating >= parseFloat(minRating);
                }
                if (maxRating) {
                    return averageRating <= parseFloat(maxRating);
                }
                return true;
            });
        }

        if (bestReviewed) {
            // jisko average rating zero ho wh data show ni hoga
            const servicesWithReviews = filteredServices.filter(service => service.ratings.length > 0);

            servicesWithReviews.sort((a, b) => b.ratings.length - a.ratings.length);

            filteredServices = servicesWithReviews;
        }

        let num_of_service = filteredServices.length;

        res.status(200).send({
            message: "perticular sub_categories_services",
            subCategories_Service: filteredServices, num_of_service
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// category according service
export const service_category_according = async (req, res) => {

    try {
        const { categoryId } = req.params

        const checkService = await Service.find({ categoryId }).select("-about_Gig -requirement")
            .populate({
                path: "sub_categoryId",
                select: "feature_SubCategories_name"
            })
            .populate({
                path: "authId",
                select: "firstName lastName authProfile"
            }).populate({
                path: "categoryId",
                select: "featureCategoriesName"
            }).sort({ createdAt: -1 })

        let num_of_service = checkService.length

        // rating popular service start
        const servicesWithAverageRating = checkService.map(service => {

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


        if (checkService) {
            res.status(200).json({
                message: "service on category according",
                services: servicesWithAverageRating,
                num_of_service,
            })
        }
        else {
            res.status(404).json({
                message: "not found this category service"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// search service
export const search_service_by_title = async (req, res) => {

    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({
                message: "Please provide a title to search."
            });
        }

        const services = await Service.find({
            title: { $regex: title, $options: 'i' }

        }).select('-about_Gig -requirement -sub_categoryId -categoryId')
            .populate({
                path: "authId",
                select: "firstName lastName"
            }).populate({
                path: "sub_categoryId",
                select: "feature_SubCategories_name"
            }).populate({
                path: "categoryId",
                select: "featureCategoriesName"
            })

        const total_of_service = services.length

        if (services.length > 0) {
            res.status(200).json({
                message: "Services found.",
                services,
                total_of_service
            });
        } else {
            res.status(404).json({
                message: "No services found with the given title."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


// perticular user according service
export const get_service_user_According = async (req, res) => {

    try {
        const { authId } = req.params

        const checkAuthPortfolio = await Portfolio.find({ authId }).select("-folioTitle -description -authId")

        if (!checkAuthPortfolio) {
            return res.status(404).json({
                message: "not found auth"
            })
        }

        let num_of_portfolio = checkAuthPortfolio.length

        const userDetails = await Service.findOne({ authId }).populate({
            path: "authId",
            select: "firstName lastName authProfile createdAt description country state Educations"
        }).select("-ratings -serviceImage -about_Gig -requirement -title -sub_categoryId")

        const checkService = await Service.find({ authId })
            .populate('ratings.reviewerId', 'firstName lastName authProfile')

            .select('-about_Gig -requirement -sub_categoryId -categoryId')
            .sort({ createdAt: 1 })


        let num_of_service = checkService.length

        let totalRatingsSum = 0;

        let totalReviewCount = 0;

        // rating popular service start
        const servicesWithAverageRating = checkService.map(service => {

            let totalStars = 0;
            let totalRatings = service.ratings.length;
            let serviceReviewCount = service.ratings.length;

            service.ratings.forEach(rating => {
                totalStars += rating.rating;
                totalRatingsSum += rating.rating; //total number of rating ke ley sum

            });
            totalReviewCount += serviceReviewCount;

            const averageRating = service.ratings.length > 0 ? totalStars / service.ratings.length : 0;

            return {
                ...service.toObject(),
                averageRating,
                totalRatings,
                totalReview: serviceReviewCount
            };
        })


        servicesWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);  //sort kara rating ko decending order mee
        // rating popular service end


        if (checkService) {
            res.status(200).json({
                message: "service on user according",
                userDetails,
                services: servicesWithAverageRating,
                num_of_service,
                totalRatingsSum,
                totalReviewCount,
                AuthPortfolio: checkAuthPortfolio, num_of_portfolio
            })
        }

        else {
            res.status(404).json({
                message: "not found this user service"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}





// rating and review by auth
export const review_and_rating = async (req, res) => {

    try {

        const { userId, serviceId } = req.params;
        const { rating, review } = req.body;

        const service = await Service.findOne({ _id: serviceId });

        if (!service) {
            return res.status(401).json({
                message: "service not found"
            });
        }

        // check alrady rating and review in same user
        const existingRating = service.ratings.find(r => r.reviewerId.toString() === userId);

        if (existingRating) {
            existingRating.rating = rating;
            existingRating.review = review;
            existingRating.createdAt = new Date()

        } else {
            service.ratings.push({ rating, review, reviewerId: userId });
        }

        await service.save();

        res.status(200).json({
            message: "successfully added or updated",
            service
        });

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
};




// rating, all, review , search, star patten yh sb ki ek me hai service ka category id ke according get

export const popular_review_rating = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { bestRating, bestReviewed, title, minRating, maxRating } = req.query;

        let services = await Service.find({ categoryId }).populate('ratings.reviewerId', 'firstName')
            .select("-about_Gig -requirement")
            .populate({
                path: "sub_categoryId",
                select: "feature_SubCategories_name"
            })
            .populate({
                path: "authId",
                select: "firstName lastName authProfile"
            }).populate({
                path: "categoryId",
                select: "featureCategoriesName"
            }).sort({ createdAt: -1 });

        if (!services || services.length === 0) {
            return res.status(400).json({
                message: "No services found for this category"
            });
        }

        // search ke ley 
        if (title) {
            services = services.filter(service => service.title && service.title.toLowerCase().includes(title.toLowerCase()))
        }

        let filteredServices = [];

        if (bestRating) {
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
            });

            filteredServices = servicesWithAverageRating.filter(service => service.averageRating > 0);
            filteredServices.sort((a, b) => b.averageRating - a.averageRating);

        } else {
            filteredServices = services.map(service => {
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
            });
        }

        // Apply the minRating and maxRating filter 
        if (minRating || maxRating) {
            filteredServices = filteredServices.filter(service => {
                const averageRating = service.averageRating;
                if (minRating && maxRating) {
                    return averageRating >= parseFloat(minRating) && averageRating <= parseFloat(maxRating);
                }
                if (minRating) {
                    return averageRating >= parseFloat(minRating);
                }
                if (maxRating) {
                    return averageRating <= parseFloat(maxRating);
                }
                return true;
            });
        }

        if (bestReviewed) {
            // jisko average rating zero ho wh data show ni hoga
            const servicesWithReviews = filteredServices.filter(service => service.ratings.length > 0);

            servicesWithReviews.sort((a, b) => b.ratings.length - a.ratings.length);

            filteredServices = servicesWithReviews;
        }

        let num_of_service = filteredServices.length;

        res.status(200).send({ services: filteredServices, num_of_service });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};




export const service_FAQ = async (req, res) => {

    try {

        const { serviceId } = req.params

        const { FAQ } = req.body


        const checkService = await Service.findOne({ _id: serviceId })

        checkService.FAQ.push(...FAQ)

        await checkService.save()

        res.status(200).json({
            message: "successfully added FAQ on this service"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const service_Price = async (req, res) => {

    try {

        const { serviceId } = req.params

        const { Basic_price, Standard_price, Premium_price } = req.body


        if (
            !Array.isArray(Basic_price) || Basic_price.length === 0 ||
            !Array.isArray(Standard_price) || Standard_price.length === 0 ||
            !Array.isArray(Premium_price) || Premium_price.length === 0
        ) {
            return res.status(400).json({
                message: "Basic_price, Standard_price, and Premium_price must be non-empty arrays"
            });
        }



        const checkService = await Service.findOne({ _id: serviceId })

        checkService.Basic_price.push(...Basic_price)
        checkService.Standard_price.push(...Standard_price)
        checkService.Premium_price.push(...Premium_price)


        await checkService.save()

        res.status(200).json({
            message: "successfully added price on this service"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const compare_package = async (req, res) => {

    try {
        const { serviceId } = req.params

        const checkService = await Service.findOne({ _id: serviceId })

        if (!checkService) {
            return res.status(404).json({
                message: "not found this service"
            })
        }

        const priceDetails = {
            basic: checkService.Basic_price,
            standard: checkService.Standard_price,
            premium: checkService.Premium_price
        }

        return res.status(200).json({
            message: "compare price",
            compare_price: priceDetails
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



export const clientReview = async (req, res) => {

    const checkClientReviews = await Service.find({}).populate('ratings.reviewerId', 'firstName lastName authProfile')

    if (checkClientReviews.length > 0) {

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

            return null; //jisme rating naa ho wh nhi show hoga
        }).filter(service => service !== null);

        res.status(200).json({
            message: "client reviews",
            clientReviews: servicesWithRatings
        });
    } else {
        res.status(404).json({
            message: "not found"
        });
    }
}



// profile gig ke ley api create
export const get_service_user_According_for_service_page = async (req, res) => {

    try {

        const { authId } = req.params

        const checkService = await Service.find({ authId }).populate({
            path: "categoryId",
            select: "featureCategoriesName"
        })
            .select("-sub_categoryId -authId  -about_Gig -requirement -ratings -FAQ -Basic_price -Premium_price -Standard_price")
            .sort({ createdAt: 1 })

        if (checkService) {
            res.status(200).json({
                message: "service on user according",
                services: checkService,
            })
        }

        else {
            res.status(404).json({
                message: "not found this user service"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


//update service

export const update_services = async (req, res) => {

    try {
        const { serviceId } = req.params

        const { sub_categoryId, title, description, categoryId, about_Gig, requirement, searchTags, in_publish, FAQ, Basic_price, Standard_price, Premium_price } = req.body


        const serviceImage = req.files && req.files.length > 0
        ? req.files.map(({ filename }) => filename)
        : [];   


        const checkService = await Service.findOne({ _id: serviceId })

        if (!checkService) {
            return res.status(404).json({
                message: "not found service"
            })
        }

        const change = await Service.findOneAndUpdate({ _id: serviceId }, {

            $set: {
                sub_categoryId, title, description, categoryId, about_Gig, requirement, searchTags, in_publish, FAQ, Basic_price, Standard_price, Premium_price, serviceImage
            }

        }, { new: true })



        res.status(200).json({
            message: "updated your profile",
            updatedService: change
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export const get_service_draft_According = async (req, res) => {

    try {
        const { authId } = req.params

        const userDetails = await Draft.findOne({ authId }).sort({ createdAt: -1 })

        if (userDetails) {
            res.send(userDetails)
        }
        else {
            res.status(404).json({
                message: "not found any services"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}





// export const update_services_draft = async (req, res) => {


//     try {
//         const { draftId } = req.params;

//         const { sub_categoryId, title, description, categoryId, about_Gig, requirement, searchTags, in_publish  } = req.body;

//         const serviceImage = req.files.map(({ filename }) => `${filename}`);

//         const Basic_price = JSON.parse(req.body.Basic_price);
//         const Standard_price = JSON.parse(req.body.Standard_price);
//         const Premium_price = JSON.parse(req.body.Premium_price);
//         const FAQ = JSON.parse(req.body.FAQ);


//         const checkService = await Draft.findOne({ _id: draftId });

//         if (!checkService) {
//             return res.status(404).json({
//                 message: "Not found service draft"
//             });
//         }

//         const updatedDraft = await Draft.findOneAndUpdate(
//             { _id: draftId },
//             {
//                 $set: {
//                     sub_categoryId, title, description, categoryId, about_Gig, requirement, searchTags, in_publish, FAQ, Basic_price, Standard_price, Premium_price, serviceImage
//                 }
//             },
//             { new: true }
//         );

//         if (in_publish === "public") {

//             const newService = new Service({
//                 sub_categoryId, title, description, categoryId, about_Gig, requirement, searchTags, in_publish, FAQ, Basic_price, Standard_price, Premium_price, serviceImage, authId: checkService.authId
//             });

//             await newService.save();

//             await Draft.findOneAndDelete({ _id: draftId });

//             return res.status(200).json({
//                 message: "Draft updated and moved to service",
//                 updatedService: newService
//             });
//         }

//         return res.status(200).json({
//             message: "Draft updated successfully",
//             updatedDraft
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };





export const update_services_draft = async (req, res) => {


    try {
        const { draftId } = req.params;

        const { sub_categoryId, title, description, categoryId, about_Gig, requirement, searchTags, in_publish } = req.body;

        // const { sub_categoryId, title, description, categoryId, about_Gig, requirement, searchTags, in_publish, Basic_price, Standard_price, Premium_price,FAQ } = req.body;

      

        const Basic_price = JSON.parse(req.body.Basic_price);
        const Standard_price = JSON.parse(req.body.Standard_price);
        const Premium_price = JSON.parse(req.body.Premium_price);
        const FAQ = JSON.parse(req.body.FAQ);


        const checkService = await Draft.findOne({ _id: draftId });

        if (!checkService) {
            return res.status(404).json({
                message: "Not found service draft"
            });
        }
        let serviceImage = checkService.serviceImage; // existing images

        if (req.files && req.files.length > 0) {
            serviceImage = req.files.map(({ filename }) => filename);
        }

        const updatedDraft = await Draft.findOneAndUpdate(
            { _id: draftId },
            {
                $set: {
                    sub_categoryId, title, description, categoryId, about_Gig, requirement, searchTags, in_publish, FAQ, Basic_price, Standard_price, Premium_price, serviceImage
                }
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Draft updated successfully",
            updatedDraft
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};




export const update_services_draft_to_public = async (req, res) => {
    try {
        const { draftId } = req.params;
        let { in_pubhish } = req.body;

        if (in_pubhish !== "public") {
            return res.status(400).json({
                message: "Invalid 'in_pubhish' value. It must be 'public'."
            });
        }

        const checkService = await Draft.findOne({ _id: draftId });

        if (!checkService) {
            return res.status(404).json({
                message: "Service draft not found"
            });
        }

        const updatedDraft = await Draft.findOneAndUpdate(
            { _id: draftId },
            {
                $set: { in_pubhish: "public" }
            },
            { new: true }
        );

        if (!updatedDraft) {
            return res.status(500).json({
                message: "Failed to update the draft"
            });
        }

        if (updatedDraft.in_pubhish === "public") {
            const newService = new Service({
                ...updatedDraft.toObject(),
                in_pubhish: "public",
                _id: undefined
            });

            await newService.save();

            await Draft.findByIdAndDelete(draftId);

            return res.status(200).json({
                message: "Draft moved to public service successfully",
                updatedService: newService
            });
        }

        return res.status(200).json({
            message: "Draft updated successfully",
            updatedDraft
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};





export const get_service_draft_According_all = async (req, res) => {

    try {
        const { authId } = req.params

        const userDetails = await Draft.find({ authId }).sort({ createdAt: -1 }).populate({
            path: "categoryId",
            select: "featureCategoriesName"
        })

        if (userDetails) {
            res.send(userDetails)
        }
        else {
            res.status(404).json({
                message: "not found any services"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}
