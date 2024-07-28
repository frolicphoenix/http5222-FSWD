
const API_URL = "https://api.nasa.gov/planetary/apod";
const apiKey = process.env.NASA_API_KEY;


async function fetchAstronomicalEvent(date) {
    try {
        const response = await fetch(`${API_URL}?date=${date}&api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;  // Returns null
    }
}

async function fetchAllAstronomicalEvents(month, year) {
    month = parseInt(month);
    year = parseInt(year);
    if (isNaN(month) || isNaN(year)) {
        return [];
    }
    let events = [];
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        try {
            const eventDate = `${year}-${month}-${day < 10 ? '0' + day : day}`;
            const event = await fetchAstronomicalEvent(eventDate);
            events.push(event);
        } catch (error) {
            console.log(`No data for ${eventDate}`, error);
        }
    }
    return events;
}

async function fetchAstronomicalEventDetail(date) {
    try {
        const response = await fetch(`${API_URL}?date=${date}&api_key=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching event detail:", error);
        return null;  // Returns null on error
    }
}

module.exports = { fetchAllAstronomicalEvents, fetchAstronomicalEventDetail };
