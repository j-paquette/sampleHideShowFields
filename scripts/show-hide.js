/**
 * This function is for the first question: does the user commute to work?
 * yes: show only the questions related to commuting to work
 * no: show only the questions related to telework
 */
function chooseSurveyType(answer){
    console.log(answer.value);

    if(answer.value == "commute"){
        //This shows the commuting questions
        document.getElementById("commute-info").classList.remove("displayNone");
        //in case the user has already selected "telework", then changes their answer to "commute" afterwards
        document.getElementById("telework-info").classList.add("displayNone");
    }
    else {
        document.getElementById("telework-info").classList.remove("displayNone");
        //in case the user has already selected "telework", then changes their answer to "commute" afterwards
        document.getElementById("commute-info").classList.add("displayNone");
    }
}

/**
 * This function shows the following option, only if the user has checked the checkbox item:
 * checkbox item unchecked: the number of hours input field is hidden
 * checkbox item checked: the number of hours input field is displayed
 */
function enterTotalHours(checkBoxElement) {
    //get the value of the checkbox
    const checkBoxChecked = checkBoxElement.checked;

    //get the div to act on
    const checkedElements = document.querySelectorAll("div.input-hours")

    checkedElements.forEach(checkedElement => {
        //This shows the commuting questions
        document.getElementById("input-hours-fulltime").classList.remove("displayNone");
        //in case the user has previously checked "five-days-per-week", then unchecks afterwards
        document.getElementById("input-hours-fulltime").classList.add("displayNone");
    });   

}

/**
 * This function shows the following question, depending on the selected answer:
 * yes: show the next question
 * no: keep the question hidden
 */
function showNextQuestion(answer){
    console.log(answer.value);

    if(answer.value == "yes") {
        //This shows the following car question
        document.getElementById("fuel-info").classList.remove("displayNone");
    }
    else {
        //in case the user has already selected "yes", then changes their answer to "no" afterwards
        document.getElementById("fuel-info").classList.add("displayNone");
    }
}