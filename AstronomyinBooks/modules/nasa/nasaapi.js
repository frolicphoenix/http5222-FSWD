const API_URL = "https://api.nasa.gov/planetary/apod"; // Adjust if using a different endpoint

async function fetchAstronomicalEvents(apiKey) {
    const url = `${API_URL}?api_key=${apiKey}&count=50`; 

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return data;
    } catch (error) {
        console.error('Failed to fetch astronomical events:', error);
        return [];
    }
}

module.exports = fetchAstronomicalEvents;
