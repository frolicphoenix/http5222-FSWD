const express = require("express");
const path = require("path"); //needed for functions having to do with file paths
const { MongoClient } = require("mongodb"); //get the mongodb client class of objects so we can create one

//Create a new mongo client
const dbUrl = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(dbUrl); //create the MongoClient

const app = express();
const port = process.env.PORT || "8888";

//settings for express app
app.set("views", path.join(__dirname, "templates")) // setting for "views" is set to path: __dirname
app.set("view engine", "pug");

// set up folder for static files (eg CSS, client side JS, image)
app.use(express.static(path.join(__dirname, "public")));


//SET UP PAGE ROUTE
//the home page's app.get callback function has to be async because its usinf async function inside it
app.get("/admin/menu", async (request, response) => {
    let links = await GetLinks();
    // console.log(links);

    //response.status(200). send("Test");
    response.render("index", { title: "FUNPOP", menu: links })
});
app.get("/featured", async (request, response) => {

    let links = await GetLinks();

    response.render("featured", { title: "Featured Content", menu: links })
});

//to run the port IMP
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})

//MongoDB FUNCTIONS
async function connection() {
    db = client.db("testdb");
    return db;
}
//gets all the links from menuLinks collection
async function GetLinks() {
    db = await connection();
    let results = db.collection("menuLinks").find({});
    return await results.toArray(); //convert results to an array 
}