const express = require("express");
const path = require("path"); //needed for functions having to do with file paths

const app = express();
const port = process.env.PORT || "8888";

//settings for express app
app.set("views", path.join(__dirname, "templates")) // setting for "views" is set to path: __dirname
app.set("view engine", "pug");

// set up folder for static files (eg CSS, client side JS, image)
app.use(express.static(path.join(__dirname, "public")));


//SET UP PAGE ROUTE
app.get("/", (request, response) => {
    //response.status(200). send("Test");
    response.render("index", { title: "FUNPOP" })
});
app.get("/featured", (request, response) => {
    response.render("featured", { title: "Featured Content" })
})

//to run the port IMP
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})