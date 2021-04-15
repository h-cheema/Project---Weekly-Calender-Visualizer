let globals = {
    form: { // Form values.
        dateStart: "1996-03-08",
        numberOfYears: 75,
        dateToday: getCurrentDate(),
    },
    visualizer: {
        days: null,
        weeks: null,
        years: null,
        intervals: [
            {amount: 0, color: "blue"}, // past
            {amount: 1, color: "orange"}, // present week is always 1 week.
            {amount: 0, color: "green"}, // future
        ],
    },
};

$(document).ready(function() {

    initApp();

    let inputForm = document.getElementById("inputForm");
    inputForm.addEventListener('input', (e) => {

        // Assign globals.form values when changed.
        const target = e.target; // Get id string

        // Use id string to set globals.form value
        globals.form[target.id] = target.value;

        // If forms values are valid, calculate weeks.
        if (isFormValid()) {
            processVisualizer();
        }

    });
});

function initApp() {
    assignDefaultFormValues()
    processVisualizer();
}

/** Set initial form values to default values. */
function assignDefaultFormValues() {
    document.getElementById("dateStart").value = globals.form.dateStart;
    document.getElementById("numberOfYears").value = globals.form.numberOfYears;
    document.getElementById("dateToday").value = globals.form.dateToday;
}

function isFormValid() {
    // Check object values for null/undefined.
    let formIsValid = true;
    let formLength = getObjectLength(globals.form);
    for (let i = 0; i < formLength; i++) {
        if (Object.values(globals.form)[i] == null 
        || Object.values(globals.form)[i] == undefined) {
            formIsValid = false;
        }
    }

    if (formIsValid) {
        return true;
    } else {
        return false;
    }
}

function processVisualizer() {
    calculateDates();
    renderVisualizer(true);
}

function renderVisualizer(visualizerValuesValid) {

    let weeks = globals.visualizer.weeks; // Total weeks
    let cellText = "O";
    let cellInnerText = "";

    // Visualizer header 
    let vHeader = document.getElementById('v-header');

    // Add cellText to each div interval and assign unique colors.
    if (visualizerValuesValid) {

        // vCells.innerText = cellInnerText;
        vHeader.innerText = (Math.round(weeks/52) + " years (" + weeks + " weeks)"); // round 2 dec

        // Cell container.
        let vContainer = document.getElementById('v-container');
        vContainer.innerHTML = ''; // Delete all child nodes.

        let interval = 0;

        // Iterate intervals.
        for (let i = 0; i < Object.values(globals.visualizer.intervals).length; i++) {

            let amount = Object.values(globals.visualizer.intervals)[i].amount;
            let color = Object.values(globals.visualizer.intervals)[i].color;
            
            // Create and append nodes.
            for (let j = 0; j < amount; j++) {

                /*  
                    Weeks
                    Age
                    Date
                */

                // Title of node (node's date).
                interval += 1;
                let nodeDay = interval * 7;
                let nodeWeek = convertDaysToMs(interval-1)*7;
                let nodeDate = new Date(new Date(globals.form.dateStart).getTime() + nodeWeek).toISOString().slice(0,10);
                let nodeYears = Math.ceil(interval / 365.25);

                let title = 
                    nodeDay + " days \n" 
                    + interval + " weeks \n" 
                    + nodeYears + " years \n" 
                    + nodeDate;
                
                // Create node.
                let cellNode = createCellNode(cellText, color, title); // create interval node.
                
                // Append node.
                vContainer.appendChild(cellNode); // append interval node.
            }

        }


    } else {
        // Reset the visualizer and display message.
        vHeader.innerText = "Please pick a valid date range.";
    }


    if (visualizerValuesValid) {
        // Render the visualizer.
        for (let i = 0; i < weeks; i++) {
            cellInnerText = cellInnerText + cellText;
        }
        // vCells.innerText = cellInnerText;
        vHeader.innerText = (
            Math.round(weeks/52) + " years (" + weeks + " weeks)"); // round 2 dec
    } else {
        // Reset the visualizer and display message.
        vHeader.innerText = "Please pick a valid date range.";
    }

}

/**
 * 
 * @param {*The displayed string/char.} cellString 
 * @param {*} color 
 * @param {*The date the node represents.} title 
 * @returns Built node.
 */
function createCellNode(cellString, color, title) {
    let node = document.createElement("div");
    node.style.color = color;
    node.innerText = cellString;
    node.title = title;
    return node;
}

/** Calculate days,weeks,years */
function calculateDates() {

    // start Date obj
    let dateStart = new Date(globals.form.dateStart);

    // years to Date obj
    let yearsMs = globals.form.numberOfYears * (365 + 0.25) * 24 * 60 * 60 * 1000;
    let dateEnd = new Date(yearsMs + dateStart.getTime()); // yearsMs + dateStartMs

    // start Date ms + years Date ms
    let dateTotalMs = dateEnd.getTime() - dateStart.getTime();

    // Date obj to ms to days number
    let days = new Date(dateTotalMs).getTime() / 1000 / 3600 / 24;

    // Store total days, weeks, years.
    globals.visualizer.days = Math.round(days);
    globals.visualizer.weeks = Math.round(days / 7);
    globals.visualizer.years = Math.round(days / 365);

    // console.log("dateStart: " + dateStart);
    // console.log("dateYears: " + dateEnd);
    // console.log("dateTotalMs: " + dateTotalMs);
    // console.log("days: " + days);



    // Calculate number of weeks per interval.
    let dateToday = new Date(globals.form.dateToday);

    // Today ms - start ms
    let weeksPast = convertMsToDays(dateToday.getTime() - dateStart.getTime()) / 7;
    globals.visualizer.intervals[0].amount = weeksPast;
    console.log(weeksPast);

    // End date ms - start date ms
    let weeksFuture = convertMsToDays(dateEnd.getTime() - dateStart.getTime()) / 7;
    globals.visualizer.intervals[2].amount = weeksFuture;
    console.log(weeksFuture);

}

function getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
}

function convertMsToDays(ms) {
    return ms / 1000 / 3600 / 24;
}

function convertDaysToMs(day) {
    return day * 1000 * 3600 * 24;
}

function getObjectLength(obj) {
    const formLength = Object.keys(obj).length;
    return formLength;
}

/** not null */
function nn(val) {
    if(val == null) {
        return false;
    } 
    return true;
}
