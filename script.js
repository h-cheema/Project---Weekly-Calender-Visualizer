let globals = {
    form: { // Form values.
        dateStart: null,
        dateToday: null,
        numberOfYears: null,
    },
    visualizer: {
        days: null,
        weeks: null,
    }
};

$(document).ready(function() {

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
            calculateDays(date1, date2);

        }

    });

    // renderVisualizer();

});

function renderVisualizer() {

    let weeks = 100;
    let cell = "O";
    let vCells = document.getElementById('v-cells');
    let vHeader = document.getElementById('v-header');

    for (let i = 0; i < weeks; i++) {
        vCells.innerText = vCells.innerText + cell;
    }

    vHeader.innerText = weeks + " weeks";
    
    console.log("visualizer rendered.");
    
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


/** Calculate weeks */
function calculateDays(date1, date2) {
    var time = date2.getTime() - date1.getTime();
    var days = time / (1000 * 3600 * 24);

    globals.visualizer.days = days;
    globals.visualizer.weeks = days/7;

    console.log("globals.visualizer.days: " + globals.visualizer.days);
    console.log("globals.visualizer.weeks: " + globals.visualizer.weeks);
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
