// Importing required modules
const express = require('express');
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || "8888";

const googlebooksAPI = require("./modules/googlebooks/api");
const nasaApi = require("./modules/nasa/nasaapi");

// Setting up express object and port
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
        const books = await googlebooksAPI.getBooksByQuery("star wars");
        const items = books.items || [];
        res.render("index", { title: "Harry Potter Books", books: items });
    } catch (error) {
        res.status(500).send("Failed to fetch books: " + error.message);
    }
});

app.get("/byfilter", async (req, res) => {
    const { title, author, year, genre } = req.query;
    if (!title && !author && !year && !genre) {
        return res.render("byfilter", { title: "Search Results", books: [], error: "No search parameters provided." });
    }

    try {
        const result = await googlebooksAPI.getBooksByFilters({ title, author, year, genre });
        res.render("byfilter", { title: "Search Results", books: result.items || [] });
    } catch (error) {
        res.status(500).send("Server error when fetching books: " + error);
    }
});

app.get('/events-by-month', async (req, res) => {
    console.log("Query Parameters:", req.query);  // This will log the month and year received
    const { month, year } = req.query;

    if (!month || !year) {
        return res.render('events-by-month', { events: [] });
    }

    const events = await nasaApi.fetchAllAstronomicalEvents(month, year);
    res.render('events-by-month', { events });
});


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
