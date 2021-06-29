// const mongoose = require("mongoose");

// const Todos = new mongoose.Schema({
//   text: {
//     type: String,
//     required:true,
//     default:"test"
//   },
//   name: {
//     type: String,
//     required:true,
//     // default:"test"
//   },
// });

// module.exports = mongoose.model("Todos", Todos);

const mongoose = require("mongoose");

const Subscriber = new mongoose.Schema({
  text: {
    type: String,
    required:true,
    // default:"new test"
  },
});

module.exports = mongoose.model("Subscriber", Subscriber);
