const Listing = require("../models/listing.js");

module.exports.index = async(req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.new = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({path : "reviews", populate : {path : "author"},}).populate("owner");
    if(!listing){
      req.flash("error", "Listing you requestd for does not exist.");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createNew = async (req, res) => {

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Your Post is live now.");
    res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "Listing you requestd for does not exist.");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
};

module.exports.update = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    req.flash("success", "Post Updation Successful.");
    res.redirect(`/listings/${id}`);
};

module.exports.destroy = async(req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Post Deletion Successful!");
    res.redirect("/listings");
};