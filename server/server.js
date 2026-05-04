const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const authRoute = require("./routes/auth");
const iconRoute = require("./routes/icon");
const categoryRoute = require("./routes/category");
const iconFontRoute = require("./routes/icon-font");
const mailListRoute = require("./routes/mail-list");
const dbo = require("./db/conn");

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.static("public"))

app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use("/auth", authRoute);
app.use("/icon", iconRoute);
app.use("/category", categoryRoute);
app.use("/icon-font", iconFontRoute);
app.use("/mail-list", mailListRoute);

app.listen(port, () => {
  dbo();
  console.log(`Server is running on port: ${port}`);
});