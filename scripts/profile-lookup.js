/*Profle Lookup
use a recursive to lookup the name?
https://stackoverflow.com/questions/53938203/javascript-recursive-search-on-an-array-of-objects
array.find: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find#examples
recursive function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#function_scope
search array of objects: https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/
recursive function: https://www.golinuxcloud.com/javascript-recursive-search-array-of-objects
*/
const contacts = [
    {
      firstName: "Akira",
      lastName: "Laine",
      number: "0543236543",
      likes: ["Pizza", "Coding", "Brownie Points"],
    },
    {
      firstName: "Harry",
      lastName: "Potter",
      number: "0994372684",
      likes: ["Hogwarts", "Magic", "Hagrid"],
    },
    {
      firstName: "Sherlock",
      lastName: "Homes",
      number: "0487345643",
      likes: ["Intriguing Cases", "Violin"],
    },
    {
      firstName: "Kristian",
      lastName: "Vos",
      number: "unknown",
      likes: ["Javascript", "Gaming", "Foxes"],
    }
  ];

function lookupProfile(name, prop){
  // returns the array object where the firstName matches the parameter name
  const constactsFirstName = contacts.find(({ firstName }) => firstName === name);
  console.log("contactsFirstName: ", constactsFirstName);

  //cars.some(car => car.color === "red" && car.type === "cabrio");
  const contactName = contacts.some(contacts => contacts.firstName === name);
	console.log("contactName: ", contactName);

  //returns the element values that match the parameter prop
  const propValue = contactsFirstName[prop];
  //console.log("propValue: ", propValue);

  //returns true/false if the prop is a property of that contact
  const propExists = contactsFirstName.hasOwnProperty(prop);
  //console.log("propExists: ", propExists);

    if(!contactName){
      console.log("No such contact");
      return "No such contact";
    }
    //loop through each property in contactFristName
    //to check if the given property(prop) is a property of that contact
    for (i = 0; i < contactsFirstName.length; i++){
      if (!propExists){
        console.log("No such property");
        return "No such property";
      }
      else {
        console.log("propValue: ", propValue);
        return propValue;
      }
    }
    console.log("propValue: ", propValue);
        return propValue;
}

lookupProfile("Akira", "likes");
lookupProfile("Kristian", "lastName");
lookupProfile("Sherlock", "likes");
lookupProfile("Harry", "likes");
lookupProfile("Bob", "number");
lookupProfile("Bob", "potato");
lookupProfile("Akira", "address");

// function lookupProfile(name, prop){
//   // returns the array object where the firstName matches the parameter name
//   const constactsFirstName = contacts.find(({ firstName }) => firstName === name);
//   console.log("contactsFirstName: ", constactsFirstName);

//   //cars.some(car => car.color === "red" && car.type === "cabrio");
//   const contactName = contacts.some(contacts => contacts.firstName === name);
// 	console.log("contactName: ", contactName);

//   //returns the element values that match the parameter prop
//   const propValue = contactsFirstName[prop];
//   //console.log("propValue: ", propValue);

//   //returns true/false if the prop is a property of that contact
//   const propExists = contactsFirstName.hasOwnProperty(prop);
//   //console.log("propExists: ", propExists);

//   //check if name is an actual contacts firstName and the given property 
//     //(prop) is a property of that contact
//     //if both are true, return the value of that property
//     if(contactName && propExists){
//       console.log("propValue: ", propValue);
//       return propValue;
//     }
//     //if the name doesn't match to any contacts, 
//     //then return
//     //"No such contact"
//     else if(!contactName && propExists){
//       console.log("No such contact");
//       return "No such contact";
//      }
//     //if the prop doesn't match to any properties associated with that contact name, 
//     //then return
//     //"No such property"
//     else {
//       console.log("No such contact");
//       return "No such contact";
//     } 
// } 

// function lookupProfile(name, prop){
//   //cars.some(car => car.color === "red" && car.type === "cabrio");
//  const contactName = contacts.some(contacts => contacts.firstName === name);
//  console.log("contactName: ", contactName);
 
//  // returns the array object where the firstName matches the parameter name
//  //const firstNameObj = contacts.find(({ firstName }) => firstName === name);
//  //const firstNameObj = contacts.firstName;
//  //console.log("firstNameObj: ", firstNameObj);
//  console.log(name);
//  //console.log("firstName: ", contacts[firstName]);

//  const nameExists = contactName.hasOwnProperty(name);
//  console.log("nameExists: ", nameExists);
 
//  //returns the element values that match the parameter prop
//  const propValue = prop;
//  console.log("propValue: ", propValue);

//  //returns true/false if the prop is a property of that contact
//  const propExists = contactName.hasOwnProperty(prop);
//  console.log("propExists: ", propExists);
 
//  for (let i = 0; i < contacts.length; i++){
   
//    //for(let j = 0; j< contacts[i].length; j++){
//      if (nameExists && propExists){
//        console.log("propValue: ", propValue);
//        return propValue;
//      }
//      else if (!nameExists && propExists){
//        console.log("No such contact");
//        return "No such contact";
//      }
//      else {
//        console.log("No such property");
//        return "No such property";
//      }
//    //}
 
//  }
 
// }