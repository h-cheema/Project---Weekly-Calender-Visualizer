let globals = {
    form: { // Form values.
        dateStart: "1996-03-08",
        numberOfYears: 1,
        dateToday: getCurrentDate(),
    },
    visualizer: {
        days: null,
        weeks: null,
        years: null,
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

    let weeks = globals.visualizer.weeks;
    let cellText = "O";
    let cellInnerText = "";

    let vHeader = document.getElementById('v-header');
    let vCells = document.getElementById('v-cells');
    vCells.innerText = cellInnerText;

    if (visualizerValuesValid) {
        // Render the visualizer.
        for (let i = 0; i < weeks; i++) {
            cellInnerText = cellInnerText + cellText;
        }
        vCells.innerText = cellInnerText;
        vHeader.innerText = (
            Math.round(weeks/52) + " years (" + weeks + " weeks)"); // round 2 dec
    } else {
        // Reset the visualizer and display message.
        vHeader.innerText = "Please pick a valid date range.";
    }

}

/** Calculate weeks */
function calculateDates() {

    // start Date obj
    let date1 = new Date(globals.form.dateStart);
    console.log("dateStart: " + date1);

    // years to Date obj
    let yearsMs = globals.form.numberOfYears * (365 + 0.25) * 24 * 60 * 60 * 1000;
    let date2 = new Date(yearsMs + date1.getTime()); // yearsMs + startDateMs
    console.log("dateYears: " + date2);

    // start Date ms + years Date ms
    let dateTotalMs = date2.getTime() - date1.getTime();
    console.log("dateTotalMs: " + dateTotalMs);

    // Date obj to ms to days number
    let days = new Date(dateTotalMs).getTime() / 1000 / 3600 / 24;
    console.log("days: " + days);

    globals.visualizer.days = Math.round(days);
    globals.visualizer.weeks = Math.round(days / 7);
    globals.visualizer.years = Math.round(days / 365);

    // console.log("globals.visualizer.days: " + globals.visualizer.days);
    // console.log("globals.visualizer.weeks: " + globals.visualizer.weeks);
    // console.log("globals.visualizer.years: " + globals.visualizer.years);

}

function getCurrentDate() {
    return new Date().toISOString().slice(0, 10);
}

function getObjectLength(obj) {
    const formLength = Object.keys(obj).length
    return formLength;
}

/** not null */
function nn(val) {
    if(val == null){
        return false;
    } 
    return true;
}
