
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
        return null;  // Return null or similar if an error occurs
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


module.exports = { fetchAllAstronomicalEvents };

// async function fetchAstronomicalEvents(date) {
//     const url = `${API_URL}?api_key=${apiKey}&date=${date}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     if (!response.ok) {
//         throw new Error(`API call failed: ${data.error}`);
//     }
//     return data;
// }

// async function fetchAllAstronomicalEvents() {
//     let events = [];
//     let date = new Date();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();
//     // Simulate fetching data for each day of the month (simplified)
//     for (let day = 1; day <= 30; day++) { // Assuming 30 days for simplicity
//         try {
//             const eventDate = `${year}-${month}-${day < 10 ? '0' + day : day}`;
//             const event = await fetchAstronomicalEvent(eventDate);
//             events.push(event);
//         } catch (error) {
//             console.log(`No data for ${day}`, error);
//         }
//     }
//     return events;
// }
