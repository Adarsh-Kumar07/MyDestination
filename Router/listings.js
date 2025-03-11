const express = require("express");
const app = express();
const listingSchema = require("./schema.js");
const path = require("path");
const wrapAsync = require("./utils/wrapAsync.js");


//Index Route
app.get("/listings", wrapAsync(async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);