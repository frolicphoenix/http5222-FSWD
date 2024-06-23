const express = require("express");
const pageRouter = express.Router();

const menuLinks = require("../menuLinks/func");

pageRouter.get("/", async (request, response) => {
  let links = await menuLinks.getLinks();
  //console.log(links);
  response.render("index", { title: "Home", menu: links });
});
pageRouter.get("/about", async (request, response) => {
  let links = await menuLinks.getLinks();
  response.render("about", { title: "About", menu: links });
});

module.exports = pageRouter;