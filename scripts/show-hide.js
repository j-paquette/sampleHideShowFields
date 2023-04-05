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