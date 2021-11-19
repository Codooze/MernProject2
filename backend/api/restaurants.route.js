import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants) //list of all the restaurants
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)//a specific restaurant with a specific id, it will get a list of all the reviews asociated with that restaurant too
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)//list of cuisines resason: we want the user to be able to select a cuisine from a dropdown menu 

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router