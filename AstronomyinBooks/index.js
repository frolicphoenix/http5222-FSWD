//importing required modules
const express = require('express');
const path = require('path');
const app = express();


const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.NASA_API_KEY); 
const apiKey = process.env.NASA_API_KEY;

const googlebooksAPI = require("./modules/googlebooks/api");
const fetchAstronomicalEvents = require('./modules/nasa/nasaapi');

//setting up express object and port
const port = process.env.PORT || "8888";
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//test message
app.get("/", async (req, res) => {
    try {
        const books = await googlebooksAPI.getBooksByQuery("HARRY POTTER");
        if (!books.items || books.items.length === 0) {
            return res.render("index", { title: "Harry Potter Books", books: [] });
        }
        res.render("index", { title: "Harry Potter Books", books: books.items });
    } catch (error) {
        res.status(500).send("Failed to fetch books: " + error.message);
    }
});

app.get("/scifi", async (req, res) => {
    try {
        // Adjust the genre as necessary
        const response = await googlebooksAPI.getBooksByGenre("Anime", 40); 
        const books = response.items || []; // Ensuring 'books' is an array even if 'items' is undefined

        // console.log(books);
        
        if (books.length === 0) {
            res.render("bygenre", { title: "Sci-Fi Books", books: [] }); // Handle case where no books are found
        } else {
            res.render("bygenre", { title: "Sci-Fi Books", books: books });
        }
    } catch (error) {
        console.error('Failed to fetch sci-fi books:', error);
        res.status(500).send("Server error when fetching books");
    }
});

app.get("/byfilter", async (req, res) => {
    try {
        const { title, author, year, genre } = req.query;
        if (!title && !author && !year && !genre) {
            res.render("byfilter", { title: "Search Results", books: [], error: "No search parameters provided." });
            return;
        }

        const result = await googlebooksAPI.getBooksByFilters({ title, author, year, genre });
        res.render("byfilter", { title: "Search Results", books: result.items || [] });
    } catch (error) {
        console.error('Failed to fetch books:', error);
        res.status(500).send("Server error when fetching books");
    }
});

app.get('/byText', async (req, res) => {
    const { textSearch } = req.query;
    if (!textSearch) {
        return res.render('byText', { books: [], message: 'Please provide text to search within books.' });
    }

    try {
        const result = await googlebooksAPI.searchBooksByText(textSearch);
        res.render('byText', { books: result.items || [], message: result.items.length ? '' : 'No books found.' });
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).render('byText', { books: [], message: 'Failed to search books due to server error.' });
    }
});

app.get('/astronomy-gallery', async (req, res) => {
    const events = await fetchAstronomicalEvents(apiKey);
    res.render('astronomy-gallery', { events: events });
});

//setting up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});