const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {validateListing, isLoggedIn, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

router.route("/")
    .get(wrapAsync(listingController.index))           //Index
    .post( isLoggedIn, validateListing, wrapAsync(listingController.createNew));            //Create Route

router.route("/new")
    .get( isLoggedIn, listingController.new);    //New Route

router.route("/:id")
    .get( wrapAsync(listingController.show))            //Show Route
    .put( isLoggedIn, isOwner, validateListing, wrapAsync(listingController.update))         //Update Route
    .delete( isLoggedIn, isOwner, wrapAsync(listingController.destroy));     //Delete Route

router.route("/:id/edit")
    .get( isLoggedIn, isOwner, wrapAsync(listingController.edit)); //Edit Route

module.exports = router;