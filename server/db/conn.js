const mongoose = require("mongoose");
const db = process.env.DATABASE_URL;

module.exports = function() {
  mongoose
    .connect(db, { useNewUrlParser: true,  useUnifiedTopology: true  })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
};
