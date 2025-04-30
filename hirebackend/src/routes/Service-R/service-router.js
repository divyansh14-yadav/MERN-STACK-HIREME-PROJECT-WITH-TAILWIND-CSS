import express from "express"
import { clientReview, compare_package, createService, get_service_draft_According, get_service_draft_According_all, get_service_user_According, get_service_user_According_for_service_page, getSingleService, perticular_sub_cat_service, popular_review_rating, review_and_rating, search_service_by_title, service_category_according, service_FAQ, service_Price, update_services, update_services_draft, update_services_draft_to_public } from "../../controllers/Service-C/service-controller.js"
import { upload } from "../../common/image.js"

const serviceRouter = express.Router()

serviceRouter.post("/create-service/:authId",upload.array("servicePoster", 3), createService)

serviceRouter.get("/single-service/:serviceId", getSingleService)

serviceRouter.get("/subcategory-service/:sub_categoryId", perticular_sub_cat_service)

serviceRouter.get("/services-category/:categoryId", service_category_according)

serviceRouter.get("/searchService", search_service_by_title)

serviceRouter.get("/auth-service/:authId", get_service_user_According)

serviceRouter.post("/review-rating/:userId/:serviceId", review_and_rating)

serviceRouter.get("/all-review-rating/:categoryId", popular_review_rating)

serviceRouter.post("/add-faq-service/:serviceId", service_FAQ)

serviceRouter.post("/add-service-price/:serviceId", service_Price)

serviceRouter.get("/comparePackage/:serviceId", compare_package)

serviceRouter.get("/clientReview", clientReview)


serviceRouter.get("/choose_service/:authId", get_service_user_According_for_service_page)

serviceRouter.put("/update-service/:serviceId",upload.array("servicePoster", 3), update_services)


serviceRouter.get("/draft_details/:authId", get_service_draft_According)

serviceRouter.put("/update-service-draft/:draftId",upload.array("serviceImage", 3), update_services_draft)


serviceRouter.put("/update-service-public/:draftId", update_services_draft_to_public)

serviceRouter.get("/draft_details_all/:authId", get_service_draft_According_all)










export default serviceRouter