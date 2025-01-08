// Load the schedule data
const schedule = [
    {
        date: "2025-01-05",
        slots: ["A", "B", "C", "A", "B", "C+A"]
    },
    {
        date: "2025-01-06",
        slots: ["B", "C", "A", "B", "C", "A+B"]
    },
    // Add more rows as needed
];

// Populate the table with data
function populateTable(data) {
    const tableBody = document.querySelector("#scheduleTable tbody");
    tableBody.innerHTML = ""; // Clear previous data

    data.forEach(row => {
        const tr = document.createElement("tr");
        const dateTd = document.createElement("td");
        dateTd.textContent = row.date;
        tr.appendChild(dateTd);

        row.slots.forEach(slot => {
            const td = document.createElement("td");
            td.textContent = slot;
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
}

// Filter the schedule by date
function filterSchedule() {
    const dateInput = document.getElementById("date").value;
    if (dateInput) {
        const filteredData = schedule.filter(row => row.date === dateInput);
        populateTable(filteredData);
    } else {
        populateTable(schedule);
    }
}

// Initialize the table with all data
document.addEventListener("DOMContentLoaded", () => populateTable(schedule));
