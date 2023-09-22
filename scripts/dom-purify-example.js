function cleanData(formData) {
    //check userInput BEFORE it's been sanitized
    console.log("formData: ", formData);

    return DOMPurify.sanitize(formData);
}

function onMainFormSubmit(e) {
    e.preventDefault();

    const textName = document.querySelector('#name');
    console.log("textName: ", textName);

    const textAreaMessage = document.querySelector('#msg');
    console.log("textAreaMessage: ", textAreaMessage);

    const data = new FormData(e.target);

    //Calls getFormValue that takes data as parameter and returns formValue.
    const formValue = getFormValue(data);
    console.log("formValue: ", formValue);

    const webformData = cleanData(
        `
        <h2>${textName}</h2>
        <p>${textAreaMessage}</p>
        `
    );
    //check userInput AFTER it's been sanitized
    console.log("webformData: ", webformData);

    const profile = document.querySelector('.profile-form');
    profile.innerText = webformData;

}


function getFormValue(formData) {
  //Get all the values from the form, but doesn't include input for multiple values such as checkboxes
  //The Object.fromEntries() method transforms a list of key-value pairs into an object. 
  const formValue = Object.fromEntries(formData.entries());
  console.log("getFormValue: ", formValue);

  //const cleanFormValue = cleanData(formValue);

  //return cleanFormValue;
  return formValue;
}

function requestInitForm() {
  const form = document.getElementById('mainForm');

  setTimeout(() => form.addEventListener('submit', onMainFormSubmit), 3000);
}

requestInitForm();