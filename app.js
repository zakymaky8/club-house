const path = require("path");
const express = require("express");
require("dotenv").config();

const app = express();

const  indexRouter  = require("./routes/indexRouter")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use("/", indexRouter);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("views"));



app.listen(process.env.PORT, () => {
    console.log(`app is running on port  ${process.env.PORT}`)
})
