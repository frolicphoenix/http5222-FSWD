// Importing required modules
const express = require('express');
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = process.env.PORT || "5000";

const nasaApi = require("./modules/nasa/nasaapi");
const googlebooksAPI = require("./modules/googlebooks/api"); // This should be declared globally if used in multiple routes

// Setting up express object and port
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index", { title: "HOME" });
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
    console.log("Query Parameters:", req.query);  // This logs the month and year received
    const { month, year } = req.query;

    if (!month || !year) {
        // Ensure to pass an empty object if query parameters are missing
        return res.render('events-by-month', {
            events: [],
            query: req.query || {}  // This ensures something is always passed to prevent undefined errors
        });
    }

    const events = await nasaApi.fetchAllAstronomicalEvents(month, year);
    res.render('events-by-month', {
        title: 'Events by Month',
        events: events,
        query: req.query  // Ensuring query is always passed to the template
    });
});


app.get('/event/:date', async (req, res) => {
    const date = req.params.date;
    try {
        const event = await nasaApi.fetchAstronomicalEventDetail(date);
        if (!event) {
            res.status(404).send("Event not found");
            return;
        }
        const books = await googlebooksAPI.getBooksByKeyword(event.title);
        res.render('event-detail', { event, books });
    } catch (error) {
        res.status(500).send("Failed to fetch event details: " + error.message);
    }
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});


module.exports = app;