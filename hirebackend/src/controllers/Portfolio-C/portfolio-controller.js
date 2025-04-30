import Portfolio from "../../models/Portfolio-M/portfolioSchema.js";


export const createPortfolio = async (req, res) => {

    try {

        const {authId} = req.params

        const { folioTitle, description } = req.body

        const portfolioImage = req.file ? req.file.filename : null

        const checkFolio = await Portfolio.findOne({ folioTitle })

        if (checkFolio) {
            return res.status(400).json({
                message: "already have this portfolio"
            })
        }

        const newFolio = new Portfolio({
            authId, folioTitle, description, portfolioImage
        })

        await newFolio.save()

        res.status(200).json({
            message: "created your portfolio"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// user according portfolio
export const AuthPortfolioFound = async (req, res) => {

    try {
        const { authId } = req.params

        const authDetails = await Portfolio.findOne({ authId }).populate({
            path: "authId",
            select: "firstName lastName authProfile"
        })

        const checkAuth = await Portfolio.find({ authId }).sort({createdAt : -1})

        if (!checkAuth) {
            return res.status(404).json({
                message: "not found auth"
            })
        }

        res.status(200).json({
            message: "your portfolio",
            authDetails,
            portfolio: checkAuth,
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// single portfolio

export const singlePortfolio = async (req, res) => {

    try {

        const { authId, folioId } = req.params

        const checkFolio = await Portfolio.findOne({ _id: folioId }).populate({
            path: "authId",
            select: "firstName lastName authProfile"
        })

        const realtedPortfolio = await Portfolio.find({ authId })

        if (checkFolio || realtedPortfolio) {
            res.status(200).json({
                message: "portfolio single",
                single_portfolio: checkFolio,
                realtedPortFolio: realtedPortfolio
            })
        }

        else {
            res.status(404).json({
                message: "not found this portfolio"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// update portfolio
export const updatePortFolio = async (req, res) => {

    try {
        const { portfolioId } = req.params

        const { folioTitle, description } = req.body

        // const portfolioImage = req.file ? req.file.filename : null

        const portfolioImage = req.file ? req.file.filename : req.body.portfolioImage ? req.body.oldImage : null;


        const checkFolio = await Portfolio.findOne({ _id: portfolioId })

        if (checkFolio) {
            await Portfolio.findOneAndUpdate({ _id: portfolioId }, {

                $set: {
                    folioTitle, description, portfolioImage
                }
            }, { new: true })

            res.status(200).json({
                message: "update portfolio"
            })
        }

        else {
            res.status(400).json({
                message: "not found portfolio"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



// delete portfolio

export const deletePortfolio = async (req, res) => {

    try {
        const { portfolioId } = req.params

        const checkFolio = await Portfolio.findOneAndDelete({ _id: portfolioId })

        if (checkFolio) {
            res.status(200).json({
                message: "deleted portfolio"
            })
        }

        else {
            res.status(404).json({
                message: "not found this portfolio"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}