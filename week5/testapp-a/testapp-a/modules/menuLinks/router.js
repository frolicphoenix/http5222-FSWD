const express = require("express");
const router = express.Router(); //create Router object

const model = require("./func");

//convert form data from query string format to JSON format
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//SET UP PAGE ROUTES

//ADMIN PAGES
router.get("/", async (request, response) => {
  let links = await model.getLinks();
  response.render("admin/menu-list", { title: "Administer menu links", menu: links });
})
//CREATE PAGE AND FORM PROCESSING PATH
router.get("/add", async (request, response) => {
  let links = await model.getLinks();
  response.render("admin/menu-add", { title: "Add link", menu: links })
})
router.post("/add/submit", async (request, response) => {
  //weight=1&path=/about&name=About
  //For POST forms, data gets submitted in the body (request.body) and you can get each field's data using request.body.<field_name>
  let wgt = request.body.weight;
  let href = request.body.path;
  let text = request.body.name;

  let newLink = {
    weight: parseInt(wgt),
    path: href,
    name: text
  };
  await model.addLink(newLink);
  response.redirect("/admin/menu"); //when done, redirect back to 
})
//DELETE FORM SUBMISSION PATH
router.get("/delete", async (request, response) => {
  //GET form data is submitted in a query string in the URL
  //To access it, use request.query.<field_name>
  await model.deleteLink(request.query.linkId);
  response.redirect("/admin/menu");
})

module.exports = router;