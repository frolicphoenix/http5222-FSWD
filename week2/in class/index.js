const express = require("express");
const { request } = require("http");
const path = require("path");
const { title } = require("process");

const app = express();
const port = process.env.PORT || "8888";

//setting up express app (current directory, views)
app.set("views", path.join(__dirname, "views")); //set to path

app.set("view engine", "pug");

//set up page route
app.get("/", (request, response) => {
 //   response.status(200).send("Test");
    response.render("index", {
        title: "Home"
    });

});
    

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})
