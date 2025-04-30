import express from "express"
import { Details_home_page } from "../../common/Home/homeController.js"

const homeRouter = express.Router()


homeRouter.get("/fetch-home-details", Details_home_page)


export default homeRouter