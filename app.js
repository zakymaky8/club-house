const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express()

app.get("/", (req, res) => {
    res.send("hello world")
})




app.listen(process.env.PORT, () => {
    console.log(`app is running on port  ${process.env.PORT}`)
})