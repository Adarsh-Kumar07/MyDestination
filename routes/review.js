const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js")
const reviewController = require("../controllers/reviews.js");

// REVIEW Routes 
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

router.delete("/:reviewId", isAuthor, wrapAsync(reviewController.destroy));

module.exports = router;