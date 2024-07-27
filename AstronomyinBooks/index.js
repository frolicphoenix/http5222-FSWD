//importing required modules
const express = require('express');
const path = require('path');

const dotenv = require("dotenv");
dotenv.config();

// const trakt = require("./modules/trakt/api");
const googlebooksAPI = require("./modules/googlebooks/api");

//setting up express object and port
const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//test message
app.get("/", async (req, res) => {
    try {
        const books = await googlebooksAPI.getBooksByQuery("the theory of everything");
        if (!books.items || books.items.length === 0) {
            return res.render("index", { title: "Harry Potter Books", books: [] });
        }
        res.render("index", { title: "Harry Potter Books", books: books.items });
    } catch (error) {
        res.status(500).send("Failed to fetch books: " + error.message);
    }
});


//setting up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});