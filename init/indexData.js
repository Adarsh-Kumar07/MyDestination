const mongoose = require("mongoose");
const initData = require("./data.js");
// const initData = require("./newData.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/mydestination";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  initData.data = initData.data.map((obj) => ({...obj, owner : "681a6a7c21ddd54571dd8759"}));    //initialize it
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();