const express = require("express");
const path = require("path"); //needed for functions having to do with file paths

const { MongoClient } = require("mongodb");

const dbUrl = "mongodb+srv://testadmin:6xykHTahsjE7wm7V@webapp-cluster.ddu9ifj.mongodb.net/";
const client = new MongoClient(dbUrl);

const app = express();
const port = process.env.PORT || "8888";

//settings for express app
app.set("views", path.join(__dirname, "templates")); // setting for "views" is set to path: __dirname
app.set("view engine", "pug");

// set up folder for static files (eg CSS, client side JS, image)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//SET UP PAGE ROUTE
app.get("/", (request, response) => {
    //response.status(200). send("Test");
    response.render("lumhome", { title: "Lum." });
});
app.get("/about", (request, response) => {
    response.render("about", { title: "About" });
});
app.get("/contact", (request, response) => {
    response.render("contact", { title: "Contact" });
});
app.get("/studio", (request, response) => {
    response.render("studio", { title: "Studio" });
});
//assets
app.get("/assets", async (request, response) => {
    let asset = await getAssets();
    // console.log(assets);
    response.render("assets", { title: "Assets", list: asset });
});
app.get("/assets/admin", async (request, response) => {
    let asset = await getAssets();
    response.render("assets-admin", { title: "ADMIN", list: asset });
});
app.get("/assets/admin/add", async (request, response) => {
    let asset = await getAssets();
    
    response.render("assets-add", { title: "Add assets", list: asset })
});
app.post("/assets/admin/add/submit", async (request, response) => {
    let weight = request.body.weight;
    let price = request.body.price;
    let imgsrc = request.body.imgsrc;
    let name = request.body.name;

    var newAssets = { "weight": weight, "price": price, "imgsrc": imgsrc, "name": name };
    // console.log(newAssets); //working
    await addAssets(newAssets);
    response.redirect("/assets")
});

//to run the port IMP
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

//Functions
async function connection() {
    db = client.db("assets-list");
    return db;
    
}

async function getAssets() {
    db = await connection();
    var results = db.collection("assets").find();
    res = await results.toArray();
    return res;
}
async function addAssets(asset) {
    db = await connection();
    var status = await db.collection("assets").insertOne(asset);
    // console.log(status);
    console.log("link added");
    return status;
}