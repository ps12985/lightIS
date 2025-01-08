// Global variables
let schedule = [];
let currentWeek = 0;

// Fetch schedule data from schedule.json
fetch('schedule.json')
    .then(response => response.json())
    .then(data => {
        schedule = data;
        displayWeekSchedule(); // Display the first week's schedule on load
    })
    .catch(error => console.error("Error loading schedule:", error));

// Populate table with schedule data
function populateTable(data) {
    const tableBody = document.querySelector("#scheduleTable tbody");
    tableBody.innerHTML = ""; // Clear existing table rows

    data.forEach(row => {
        const tr = document.createElement("tr");
        const dateTd = document.createElement("td");
        dateTd.textContent = row.date;
        tr.appendChild(dateTd);

        // Populate time slot columns
        Object.values(row.time_slots).forEach(slot => {
            const td = document.createElement("td");
            td.textContent = slot;
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
}

// Filter the schedule by a specific date
function filterSchedule() {
    const dateInput = document.getElementById("date").value; // Get the selected date in YYYY-MM-DD format
    const formattedDate = dateInput.split("-").reverse().join("-"); // Convert to DD-MM-YYYY format

    const filteredData = schedule.filter(row => row.date === formattedDate);

    const tableBody = document.querySelector("#scheduleTable tbody");
    tableBody.innerHTML = ""; // Clear the table before populating new data

    if (filteredData.length === 0) {
        // Display a message if no data is found for the selected date
        const noDataMessage = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 7; // Spanning all columns
        td.textContent = "No schedule available for the selected date.";
        td.style.textAlign = "center";
        noDataMessage.appendChild(td);
        tableBody.appendChild(noDataMessage);
    } else {
        populateTable(filteredData);
    }
}

// Display schedule for the current week
function displayWeekSchedule() {
    const startIndex = currentWeek * 7; // Calculate start index for the current week
    const endIndex = startIndex + 7; // Calculate end index for the week
    populateTable(schedule.slice(startIndex, endIndex));
}

// Show the previous week's schedule
function showPreviousWeek() {
    currentWeek = Math.max(0, currentWeek - 1); // Prevent going below the first week
    displayWeekSchedule();
}

// Show the next week's schedule
function showNextWeek() {
    currentWeek++;
    displayWeekSchedule();
}

// Toggle dark mode for the app
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
