//import required modules
const express = require("express");
const path = require("path");

//setup express object and port
const app = express();
const port = process.env.PORT || "8888";

//setup express object
app.set("views", path.join(__dirname, "template"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname), "public"));

//PAGE ROUTING
app.get("/", (request, response) => {
    response.render("index", {title: "Home"});
});


//set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});