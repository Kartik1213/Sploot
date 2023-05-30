const mongoose = require("mongoose");

exports.connect = () => {
    mongoose.connect(
        process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/sploot",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
    );
}
