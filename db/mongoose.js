const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// let connection = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/friends');
let connection = mongoose.connect("mongodb://localhost:27017/japanpost");

const mongooseSchema = mongoose.Schema({
  countryName: String,
  countryCode: String,
  regionCode: Number,
  maxLength: Number,
  maxLWH: Number,
  method: String,
  minWeight: Number,
  maxWeight: Number,
  rate: Number
});

const ratesModel = mongoose.model("rates", mongooseSchema);

module.exports = {
  mongoose,
  ratesModel
};
