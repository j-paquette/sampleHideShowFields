function cleanData(userInput) {
    //check userInput BEFORE it's been sanitized
    console.log("userInput: ", userInput);

    return DOMPurify.sanitize(userInput);
}

function handleFormSubmit(e) {
    e.preventDefault();

    const textId = document.querySelector('#my-text-id');
    console.log("textId: ", textId);

    const textAreaId = document.querySelector('my-textarea-id');
    console.log("textAreaId: ", textAreaId);


    const data = new FormData(e.target);

    //Calls getFormValue that takes data as parameter and returns formValue.
    const formValue = cleanData(getFormValue(data));

    console.log("formValue: ", formValue);

    // webformData = cleanData(
    //     `
    //     <h2>${textId}</h2>
    //     <p>${textAreaId}</p>
    //     `
    // );

}

/**
 This function gets the form data submitted by the user (as a parameter) and returns formValue.
 @param formData the data entered by the user.
*/
function getFormValue(webformData) {
    //Get all the values from the form, but doesn't include input for multiple values such as checkboxes
    //The Object.fromEntries() method transforms a list of key-value pairs into an object. 
    const formValue = Object.fromEntries(webformData.entries());
  
    //The Object contains an array in topics that contains all the checked values
    formValue.frmCltEwsServices = formData.getAll("frmCltEwsServices");
  
    return formValue;
  }

    //check userInput AFTER it's been sanitized
    console.log("webformData: ", webformData);

    const webForm = document.querySelector('.web-form');
    webForm.innerHTML = webformData;
}

document.querySelector('web-form').addEventListener('sumbit', handleFormSubmit);