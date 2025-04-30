import express from "express"
import { AuthPortfolioFound, createPortfolio, deletePortfolio, singlePortfolio, updatePortFolio } from "../../controllers/Portfolio-C/portfolio-controller.js"
import { upload } from "../../common/image.js"


const portfolioRouter = express.Router()

portfolioRouter.post("/createPortfolio/:authId",upload.single("portfolioImage"), createPortfolio)

portfolioRouter.get("/foundPortfolio/:authId", AuthPortfolioFound)

portfolioRouter.get("/singleFolio/:folioId/:authId", singlePortfolio)

portfolioRouter.put("/updatePortfolio/:portfolioId",upload.single("portfolioImage"),  updatePortFolio)

portfolioRouter.delete("/deletePortfolio/:portfolioId", deletePortfolio)

export default portfolioRouter