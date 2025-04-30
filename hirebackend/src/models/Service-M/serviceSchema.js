import mongoose from "mongoose";


const serviceSchema = new mongoose.Schema({

    sub_categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feature_Sub_Category"
    },

    title: {
        type: String
    },

    description: {
        type: String
    },

    authId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feature_Category"
    },

    serviceImage: {
        type: Array
    },

    about_Gig: {
        type: String
    },

    requirement: {
        type: String
    },

    in_pubhish: {
        type: String,
        enum: ["draft", "public"],
        default: "draft"
    },
    searchTags: {
        type: String
    },

    ratings: [
        {
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            review: {
                type: String
            },
            reviewerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Auth"
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],

    FAQ: [
        {
            question: {
                type: String
            },
            answer: {
                type: String
            }
        }
    ],

    Basic_price: [

        {
            b_Name: {
                type: String
            },

            b_description: {
                type: String
            },

            b_vector_file: {
                type: String,
                
            },

            b_printable_file: {
                type: String,
                
            },

            b_mockup: {
                type: String,
                
            },

            b_source_file: {
                type: String,
                
            },

            b_social_media_kit: {
                type: String,
                
            },

            b_number_of_concept: {
                type: Number
            },

            b_revisions: {
                type: Number
            },

            b_price: {
                type: Number
            }

        }
    ],

    Standard_price: [

        {
            s_Name: {
                type: String
            },

            s_description: {
                type: String
            },

            s_vector_file: {
                type: String,
                
            },

            s_printable_file: {
                type: String,
                
            },

            s_mockup: {
                type: String,
                
            },

            s_source_file: {
                type: String,
                
            },

            s_social_media_kit: {
                type: String,
                
            },

            s_number_of_concept: {
                type: Number
            },

            s_revisions: {
                type: Number
            },

            s_price: {
                type: Number
            }

        }
    ],

    Premium_price: [

        {
            p_Name: {
                type: String
            },

            p_description: {
                type: String
            },

            p_vector_file: {
                type: String,
                
            },

            p_printable_file: {
                type: String,
                
            },

            p_mockup: {
                type: String,
                
            },

            p_source_file: {
                type: String,
                
            },

            p_social_media_kit: {
                type: String,
                
            },

            p_number_of_concept: {
                type: Number
            },

            p_revisions: {
                type: Number
            },

            p_price: {
                type: Number
            }
        }
    ]

}, { timestamps: true })


const Service = mongoose.model("Service", serviceSchema)

export default Service