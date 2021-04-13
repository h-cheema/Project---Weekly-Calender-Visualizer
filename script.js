let globals = {
    form: { // Form values.
        dateStart: "1990-01-01",
        numberOfYears: 80,
        dateToday: getCurrentDate(),
    },
    visualizer: {
        days: null,
        weeks: null,
    },
};

$(document).ready(function() {

    initFormValues();

    let inputForm = document.getElementById("inputForm");
    inputForm.addEventListener('input', (e) => {

        // Assign globals.form values when changed.
        const target = e.target; // Get id string

        // Use id string to set globals.form value
        globals.form[target.id] = target.value;

        // If forms values are valid, calculate weeks.
        if (isFormValid()) {

            // Calculate weeks if form valid.
            // let date1 = new Date('March 8, 1996 01:00:00');
            // let date2 = new Date('March 8, 2096 01:00:00');

            let date1 = new Date (globals.form.dateStart);
            let date2 = new Date (globals.form.dateToday);
            
            let valuesAreValid = false;
            if (date1.getTime() < date2.getTime()) {
                calculateDays(date1, date2);
                valuesAreValid = true;
            }
            
            renderVisualizer(valuesAreValid);
        }
    });
});

function initFormValues() {
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
        console.log("Form is valid.");
        return true;
    } else {
        console.log("Form is not valid.");
        return false;
    }
}

// Renders when form values are valid.
function renderVisualizer(valuesAreValid) {

    let weeks = globals.visualizer.weeks;
    let cellText = "O";
    let cellInnerText = "";

    let vHeader = document.getElementById('v-header');
    let vCells = document.getElementById('v-cells');
    vCells.innerText = cellInnerText;

    if (valuesAreValid) {
        // Render the visualizer.
        for (let i = 0; i < weeks; i++) {
            cellInnerText = cellInnerText + cellText;
        }
        vCells.innerText = cellInnerText;
        vHeader.innerText = weeks + " weeks (" + Math.round(weeks/52 * 100)/100 + " years)"; // round 2 dec
    } else {
        // Reset the visualizer and display message.
        vHeader.innerText = "Please pick a valid date range.";
    }

}

/** Calculate weeks */
function calculateDays(date1, date2) {
    
    var time = date2.getTime() - date1.getTime();
    var days = time / (1000 * 3600 * 24);

    globals.visualizer.days = Math.round(days); 
    globals.visualizer.weeks = Math.round(days/7);

    console.log("globals.visualizer.days: " + globals.visualizer.days);
    console.log("globals.visualizer.weeks: " + globals.visualizer.weeks);
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
