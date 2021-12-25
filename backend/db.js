const mongoose = require("mongoose");
const url = "mongodb+srv://skd7257:TCToCxok8d0Yp1vF@cluster0.kgeey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

module.exports.connect = () => {
  mongoose
    .connect(url, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("Error: ", error));
};
