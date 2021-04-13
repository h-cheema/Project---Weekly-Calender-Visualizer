$( document ).ready(function() {


    // Get form input
    let dateStart = document.getElementById("dateStart");
    let dateStartVal;

    let numberOfYears = document.getElementById("numberOfYears");
    let numberOfYearsVal;

    let dateToday = document.getElementById("dateToday");
    let dateTodayVal;


    dateStart.addEventListener('input', () => {
        console.log(dateStart.value);
    });
    numberOfYears.addEventListener('input', () => {
        console.log(dateStart.value);
    });
    dateToday.addEventListener('input', () => {
        console.log(dateStart.value);
    });

    if(nn(dateStartVal) || nn(numberOfYearsVal) || nn(dateTodayVal)){

    }

    // Calculate weeks
    // let vHeader = document.getElementById("v-Header");

});

function nn(val) {
    if(val != null){
        return true;
    }
    return false;
}