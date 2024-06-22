const express = require("express");
const path = require("path"); //needed for functions having to do with file paths
const dotenv = require("dotenv");
console.log(dotenv);
console.log("yes");
dotenv.config(); //loads the environment variable from the .env file

const app = express();
const port = process.env.PORT || "8888";

const router = require("./modules/menuLinks/router");

//Settings for Express app
app.set("views", path.join(__dirname, "views")); //setting for "views" is set to path: __dirname/views
app.set("view engine", "pug");

//Set up folder for static files (e.g. CSS, client-side JS, images)
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})


