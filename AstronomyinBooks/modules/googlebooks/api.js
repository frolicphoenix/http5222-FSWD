
const API_URL = "https://www.googleapis.com/books/v1/volumes";

async function getBooksByQuery(query) {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

    // console.log(apiKey);

    const encodedQuery = encodeURIComponent(query);
    const reqURL = `${API_URL}?q=${encodedQuery}&key=${apiKey}`;

    // console.log("Request URL:", reqURL); // Log the URL to ensure it's correct

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

module.exports = {
    getBooksByQuery
};
