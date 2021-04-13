let globals = {
    // Form values.
    form: {
        dateStartVal: null,
        dateTodayVal: null,
        numberOfYearsVal: null,
    }
};

$(document).ready(function() {


    let inputForm = document.getElementById("inputForm");
    inputForm.addEventListener('input', (e) => {

        // Assign globals.form values when changed.
        const targetId = e.target.id; // Get id string

        // Use id string to set globals.form value
        globals.form[targetId] = targetId;
        
        // If forms values are valid, calculate weeks.
        if (isFormValid()) {

            console.log("form is valid.");

            // Loop through globals.form values
            const formLength = getObjectLength(globals.form);
            for (let i = 0; i < formLength; i++) {
                let element = globals.form[i];
                console.log("element:" + element);
            }

            // Calculate weeks if form valid.
        }

        console.log("input changed." + e.target);
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

    // calculateWeeks(globals.form.dateStartVal, globals.form.dateTodayVal)

    console.log("visualizer rendered.");
    
}

function isFormValid() {

    // const formLength = getObjectLength(globals.form);
    // for (let i = 0; i < formLength; i++) {        
    // }

    if(nn(globals.form.dateStartVal) 
    && nn(globals.form.numberOfYearsVal) 
    && nn(globals.form.dateTodayVal)) {
        return true;
    }
    return false;
}


/** Calculate weeks */
function calculateWeeks(date1, date2) {
    // var time = date2.getTime() - date1.getTime();
    // var weeks = time / (1000 * 3600 * 24 * 7);
    // console.log(date1);
}

function getObjectLength(obj) {
    const formLength = Object.keys(obj).length
}

/** not null */
function nn(val) {
    if(val == null){
        return false;
    } 
    return true;
}
