const express = require("express");
//const { request } = require("http");
const path = require("path");
const { MongoClient } = require("mongodb"); //get the MongoClient class of objects so we can create one

//Create a new MongoClient
const dbUrl = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(dbUrl); //create tthe MongoClient


//const { title } = require("process");

const app = express();
const port = process.env.PORT || "8888";

//setting up express app (current directory, views)
app.set("views", path.join(__dirname, "views")); //set to path

app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname,"public")));

//set up page route
//the home page's app.get callback function has to be asynchronous because it's using an asynchronous function inside it.
app.get("/", async (request, response) => {
    let links = await getLinks();
    //console.log(links);
    response.render("index", {
        title: "Home",
        menu: links
    });

});
    

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

//MONGODB FUNCTIONS
async function connection() {
    db = client.db("testdb");
    return db; //return database
}

//get all links from menuLinks
async function getLinks() {
    db = await connection();
    let results = db.collection("menuLinks").find({});
    return await results.toArray(); //convert results to an array
}
