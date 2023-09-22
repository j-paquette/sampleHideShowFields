/**
 * This function validates the date selected with the date-picker, also entered manually?? to check the date must:
 * - equal to today's date
 * - after today's date
 * @param {*} dateElement 
 */
function onCompareDateClick(dateElement) {

  const today = new Date();
  //remove the 0 in 0${today.getMonth()} otherwise it will add a 0 to 2-digit months (ie, 012, 011, 010)
  //get Date() as milliseconds instead of  using date()
  let formatTodaysDate = `${today.getFullYear()}-0${today.getMonth()}-${today.getDate()}`;
  console.log("formatTodaysDate", formatTodaysDate);

  const selectedDate = dateElement.value;
  console.log("selectedDate: ", selectedDate);

  if (formatTodaysDate >= selectedDate) {
    return showMessage("Please enter a value greater than or equal to today's date.", "error");
  }
}

  function isToday(date) {
    const today = new Date();
  
    // Today's date
    console.log(today);
  
    if (
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === date.getDate()
    ) {
      let formatDate = `${today.getFullYear()}-0${today.getMonth()}-${today.getDate()}`;
      console.log("formatDate", formatDate);
      return true;
    }
      let formatDate = `${today.getFullYear()}-0${today.getMonth()}-${today.getDate()}`;
      console.log("formatDate", formatDate);
    return false;
  }
  
  console.log(isToday(new Date())); //  true
  //console.log(isToday(new Date('2022-01-21'))); // false
  