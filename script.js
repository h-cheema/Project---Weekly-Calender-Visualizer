$(document).ready(function() {

    // // Get form input.
    // let dateStart = document.getElementById("dateStart");
    // let numberOfYears = document.getElementById("numberOfYears");
    // let dateToday = document.getElementById("dateToday");

    // // Form values.
    // let dateStartVal;
    // let numberOfYearsVal;
    // let dateTodayVal;

    // // Form input listeners.
    // dateStart.addEventListener('input', () => {
    //     dateStartVal = dateStart.value;
    //     console.log(dateStartVal);
    //     checkNulls(dateStartVal, numberOfYearsVal, dateTodayVal);
    // });
    // numberOfYears.addEventListener('input', () => {
    //     numberOfYearsVal = numberOfYears.value;
    //     console.log(numberOfYearsVal);
    //     checkNulls(dateStartVal, numberOfYearsVal, dateTodayVal);
    // });
    // dateToday.addEventListener('input', () => {
    //     dateTodayVal = dateToday.value;
    //     console.log(dateTodayVal);
    //     checkNulls(dateStartVal, numberOfYearsVal, dateTodayVal);
    // });

    // // Calculate weeks if form valid.
    // if(nn(dateStartVal) && nn(numberOfYearsVal) && nn(dateTodayVal)) {
    //     calculateWeeks(dateStartVal, dateTodayVal)
    // }


    renderVisualizer();


});


/**  */
function renderVisualizer() {

    let weeks = 100;
    let cell = "O";
    let vCells = document.getElementById('v-cells');
    let vHeader = document.getElementById('v-header');

    for (let i = 0; i < weeks; i++) {
        vCells.innerText = vCells.innerText + cell;
    }

    vHeader.innerText = weeks + " weeks";
    
}


/** Calculate weeks */
function calculateWeeks(date1, date2) {
    // var time = date2.getTime() - date1.getTime();
    // var weeks = time / (1000 * 3600 * 24 * 7);
    // console.log(date1);
}


/** not null */
function nn(val) {
    if(val == null){return false;} 
    return true;
}
