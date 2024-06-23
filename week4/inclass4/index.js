const express = require("express");
const path = require("path"); //needed for functions having to do with file paths
const { MongoClient, ObjectId } = require("mongodb"); //get the mongodb class of objects

// const dotenv = require("dotenv");
// dotenv.config();

//create a new MongoClient
const dbURL = `mongodb://localhost:27017/`;
const client = new MongoClient(dbURL); //creates MongoClient

const app = express();
const port = process.env.PORT || "8888";

//Setting for express app
app.set("views", path.join(__dirname, "templates")); // setting for "views" is set to path: __dirname/views(templates folder)  
app.set("view engine", "pug");

//Setup folders for static files (eg CSS, client-side JS,images)
app.use(express.static(path.join(__dirname, "public")));

//convert query string formats in form data to JSON format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SET UP PAGE ROUTE
app.get("/", async (request, response) => {
    let links = await getLinks();
    response.render("index", { title: "Home", menu: links });
});
app.get("/about", async (request, response) => {
    let links = await getLinks();
    response.render("about", { title: "About", menu: links });
});
app.get("/admin/menu", async (request, response) => {
    let links = await getLinks();
    response.render("menu-list", { title: "Administer menu links", menu: links });
});
app.get("/admin/menu/add", async (request, response) => {
    let links = await getLinks();
    response.render("menu-add", { title: "Add menu link", menu: links });
});

// ------------ path for processing the create form
app.post("/admin/menu/add/submit", async(request, response) => {
    //query string format: weight=0&path=/contact&name=..
    //make data accessible as if it was a JSON object 
    //POST form data is passed via the body(request.body)
    let wgt = request.body.weight; //weight is the name of the weight field
    let href = request.body.path;
    let text = request.body.name;
    let newLink = {
        weight: wgt,
        path: href,
        name:text
    }
    await addLink(newLink);
    response.redirect("/admin/menu");
});

// ------------ path for processing the delete form
app.get("/admin/menu/delete", async (request, response) => {
    //get the link_id
    //for a GET form, the data is passed in the query string of the URL
    let id = request.query.linkId;

    //execute the function to delete by _id
    deleteLink(id);

    //redirect back to main link admin page
    response.redirect("/admin/menu");
});
// ------------ path for editing form
app.get("/admin/menu/edit", async (request, response) => {
    let id = request.query.linkId;

    if(id) {
        let linkToEdit = await getSingleLink(id);
        let links = await getLinks();
        response.render("menu-edit", { title: "Edit menu link", menu: links, editLink: linkToEdit });
    } else {
        response.redirect("/admin/menu");
    }
});
app.post("/admin/menu/edit/submit", async (request, response) => {
    let id = request.body.linkId;
    let wgt = request.body.weight; //weight is the name of the weight field
    let href = request.body.path;
    let text = request.body.name;
    let link = { 
        weight: wgt,
        path: href,
        name: text
    }
    await editLink(id, link);
    //console.log(id);
    response.redirect("/admin/menu")
    
});


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

//MongoDB Functions
async function connection() {
    db = client.db("newdb");
    return db; //returns the database
}
//get all links form menulinks
async function getLinks() {
    db = await connection();
    let results = db.collection("menuLinks").find({});
    return await results.toArray(); //converts results to an array
}

//insert one document to menuLinks collection
async function addLink(newLink) {
    db = await connection();
    await db.collection("menuLinks").insertOne(newLink);
    console.log("link added");
}
//delete one document by _id
async function deleteLink(id) {
    db = await connection();
    const deleteIdFilter = { _id: new ObjectId(id) };
    let result = await db.collection("menuLinks").deleteOne(deleteIdFilter);
    if(result.deletedCount == 1) {
        console.log("deleted successful.")
    }
}
async function getSingleLink(id) {
    db = await connection();
    const editId = { _id: new ObjectId(id) };
    let result = await db.collection("menuLinks").findOne(editId);
    return result;
}
async function editLink(id, link) {
    db = await connection();
    let result = await db.collection("menuLinks").updateOne({ _id : new ObjectId(id) }, { $set: link });
    //console.log(result);
    return result;
}