/**
 * This function collects the user entered data into formValue obj
 */
async function onMainFormSubmit(event){  
    
      //Prevents reloading the page
      event.preventDefault();
  
      const data = new FormData(event.target);
  
      //Calls getFormValue that takes data as parameter and returns formValue.
      const formValue = getFormValue(data);

      //console.log("formValue.requestType: ", formValue.frmCltRequestType);

      //console.log("request title has been changed to: ", changeRequestTitle(formValue));

}

/**
  This function gets the form data submitted by the user (as a parameter) and returns formValue.
  @param formData the data entered by the user.
*/
function getFormValue(formData) {
    //Get all the values from the form, but doesn't include input for multiple values such as checkboxes
    //The Object.fromEntries() method transforms a list of key-value pairs into an object. 
    const formValue = Object.fromEntries(formData.entries());
  
    //The Object contains an array in topics that contains all the checked values
    formValue.frmCltEwsServices = formData.getAll("frmCltEwsServices");

    //call changeRequestTitle()
    changeRequestTitle();
  
    return formValue;
}


/**
 * This function will change the title name, depending on the frmCltRequestType selected
 */
function changeRequestTitle() {
    //initialize variable with an empty string so it doesn't cause an 'undefined' error if
    //the value doesn't exist
    let newTitleName = "";
    //get the value requestType element
    const titleNameElement = document.getElementById("frmCltRequestType");
    console.log("titleNameElement.value: ", titleNameElement.value);

    let titleNameValue = titleNameElement.value;
    console.log("titleNameValue: ", titleNameValue);

    //get the value requestType element
    //let titleName = formValue.frmCltRequestType;
    //console.log("titleName: ", titleName); 

    //let newTitleName;

    
    //get the value from titleNameElement
    //const titleNameValue = titleNameElement.innerText.trim();  

    //change the name, depending on the selected requestType
    switch (titleNameValue){
        case "newNonProd":
            newTitleName = "Request for a New Service Account to call the Software Factory enterprise web services Environment: Non-Production";
            titleNameValue = titleNameValue.replaceAll(titleNameValue, newTitleName);
            break;
        case "modifyNonProd":
            newTitleName = "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Non-Production";
            titleNameValue = titleNameValue.replaceAll(titleNameValue, newTitleName);
            break;
        case "newProd":
            newTitleName.textContent = "Request for a New Service Account to call the Software Factory enterprise web services Environment: Production";
            titleNameValue = titleNameValue.replaceAll(titleNameValue, newTitleName);
            break;
        case "modifyProd":
            newTitleName.textContent = "Request to Modify the Access of a Service Account to call the Software Factory enterprise web services Environment: Production";
            titleNameValue = titleNameValue.replaceAll(titleNameValue, newTitleName);
            break;
        default:
            console.log("your request type is invalid");
    }


}


/**
  This function submits the user's web form data triggered by type="submit".
*/
function sdsRequestInitForm() {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', onMainFormSubmit);
  
    //This will initialize the global event handlers (ie, onchange, etc) in the HTML, when it has finished loading
    //The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
    //Fixed: When I refreshed the browser to retest the same data (cached data=YES), it was still set to yes but the date field was hidden
    // document.addEventListener('DOMContentLoaded', (event)=> {
    //   showExpiryDateOnChange(document.getElementById("frmCltEwsExpire"));
    //   showQuestionsOnchange(document.getElementById("frmCltRequestType"));
    //   onDropdownSelection(document.getElementById("frmCltExistInProd"));
    //   onEwsCheckboxClick(document.getElementById("wsaddress"));
    //   onEwsCheckboxClick(document.getElementById("wsemail"));
    //   onEwsCheckboxClick(document.getElementById("wsed"));
    //   onEwsCheckboxClick(document.getElementById("wsdblink"));
    //   //Can add other items here...
    // });
  }
  
  //Call the function to submit the form 
  sdsRequestInitForm();