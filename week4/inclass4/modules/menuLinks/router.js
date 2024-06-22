var express = require("express");
var router = express.Router();

var model = require("./func");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//SET UP PAGE ROUTE
router.get("/", async (request, response) => {
    let links = await model.getLinks();
    response.render("index", { title: "Home", menu: links });
});
router.get("/about", async (request, response) => {
    let links = await model.getLinks();
    response.render("about", { title: "About", menu: links });
});
router.get("/admin/menu", async (request, response) => {
    let links = await model.getLinks();
    response.render("menu-list", { title: "Administer menu links", menu: links });
});
router.get("/admin/menu/add", async (request, response) => {
    let links = await model.getLinks();
    response.render("menu-add", { title: "Add menu link", menu: links });
});

// ------------ path for processing the create form
router.post("/admin/menu/add/submit", async(request, response) => {
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
router.get("/admin/menu/delete", async (request, response) => {
    //get the link_id
    //for a GET form, the data is passed in the query string of the URL
    let id = request.query.linkId;

    //execute the function to delete by _id
    deleteLink(id);

    //redirect back to main link admin page
    response.redirect("/admin/menu");
});
// ------------ path for editing form
router.get("/admin/menu/edit", async (request, response) => {
    let id = request.query.linkId;

    if(id) {
        let linkToEdit = await getSingleLink(id);
        let links = await model.getLinks();
        response.render("menu-edit", { title: "Edit menu link", menu: links, editLink: linkToEdit });
    } else {
        response.redirect("/admin/menu");
    }
});
router.post("/admin/menu/edit/submit", async (request, response) => {
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
 model.exports = router;