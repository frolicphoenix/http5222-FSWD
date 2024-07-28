
const API_URL = "https://www.googleapis.com/books/v1/volumes";
const apiKey = process.env.GOOGLE_BOOKS_API_KEY;


async function getBooksByQuery(query) {
    
    // console.log(apiKey);
    const encodedQuery = encodeURIComponent(query);
    const reqURL = `${API_URL}?q=${encodedQuery}&key=${apiKey}`;

    console.log("Request URL:", reqURL); // Log the URL to ensure it's correct

    try {
        const response = await fetch(reqURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        // console.log("API response:", data); // Log the full response

        if (!data.items) {
            console.log("No books returned by API.");
        }

        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
}

async function getBooksByGenre(genre, maxResults = 10) {
    
    const encodedGenre = encodeURIComponent(`subject:${genre}`);
    const reqURL = `${API_URL}?q=${encodedGenre}&maxResults=${maxResults}&key=${apiKey}`;

    // console.log("Request URL:", reqURL); // Log the URL to ensure it's correct

    try {
        const response = await fetch(reqURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books by genre:', error);
        throw error;
    }
}

async function getBooksByFilters({ title, author, year, genre }) {
    const queries = [];
    if (title) queries.push(`intitle:"${title}"`);
    if (author) queries.push(`inauthor:"${author}"`);
    if (year) queries.push(`inpudate:"${year}"`);
    if (genre) queries.push(`subject:"${genre}"`);
    
    if (queries.length === 0) {
        console.error('No search parameters provided.');
        return { items: [] }; // Return empty result to avoid hitting API unnecessarily
    }

    const query = queries.join('+');
    const encodedQuery = encodeURIComponent(query);
    const url = `${API_URL}?q=${encodedQuery}&key=${apiKey}`;

    console.log("Constructed URL:", url); // This will show the full URL

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            console.error('API Error Response:', data);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        return { items: [] }; // Return empty items array on error
    }
}

async function searchBooksByText(query) {
    const encodedQuery = encodeURIComponent(`"${query}"`); // Ensures the query is treated as a phrase
    const url = `${API_URL}?q=${encodedQuery}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return data; // Returns the full response
    } catch (error) {
        console.error('Error searching books by text:', error);
        return { items: [] }; // Return empty items array on error
    }
}

async function searchBooksByText(query) {
    const encodedQuery = encodeURIComponent(`intext:"${query}"`);
    const url = `${API_URL}?q=${encodedQuery}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${data.error.message}`);
        }
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        return { items: [] }; // Safe fallback
    }
}

async function searchBooks(query) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Google Books API call failed: ${data.error.message}`);
        }
        return data.items || [];
    } catch (error) {
        console.error('Failed to fetch books:', error);
        throw error;
    }
}

async function getBooksByKeyword(keyword) {
    const encodedKeyword = encodeURIComponent(`"${keyword}"`);
    const url = `${API_URL}?q=${encodedKeyword}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return data.items || [];
    } catch (error) {
        console.error('Error searching books by keyword:', error);
        return [];
    }
}

module.exports = {
    getBooksByQuery,
    getBooksByGenre,
    getBooksByFilters,
    searchBooksByText,
    searchBooks,
    getBooksByKeyword
};
