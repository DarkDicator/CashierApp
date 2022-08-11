import express from "express"
import BusinessController from "./business.controller.js"
import ItemController from "./item.controller.js"

const router = express.Router()

router.route("/users").get(BusinessController.apiGetBusiness)
router.route("/users").post(BusinessController.apiPostBusiness)
router.route("/users").put(BusinessController.apiUpdateBusiness)
router.route("/login").post(BusinessController.apiLogin)

router.route("/items")
    .post(ItemController.apiPostItem)
    .delete(ItemController.apiDeleteItem)
    .get(ItemController.apiGetItem)
    .put(ItemController.apiUpdateItem)
// router.route("/items").get(ItemController.apiGetItem)
// router.route("/items").delete(ItemController.apiDeleteItem)
// router.route("/items").put(ItemController.apiUpdateItem)

export default router