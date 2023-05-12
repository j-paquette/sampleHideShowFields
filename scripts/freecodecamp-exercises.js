const recordCollection = {
    2548: {
      albumTitle: 'Slippery When Wet',
      artist: 'Bon Jovi',
      tracks: ['Let It Rock', 'You Give Love a Bad Name']
    },
    2468: {
      albumTitle: '1999',
      artist: 'Prince',
      tracks: ['1999', 'Little Red Corvette']
    },
    1245: {
      artist: 'Robert Palmer',
      tracks: []
    },
    5439: {
      albumTitle: 'ABBA Gold'
    }
  };
  
// Only change code below this line
function updateRecords(records, id, prop, value) {
  //get the album contents from id
  const albumId = records[id];
  
  //check if album(id) contains tracks(prop)
  const checkTracksExists = albumId.hasOwnProperty("tracks");
  
  //check if the prop value is an empty string
  if (value === "") {
    delete albumId[prop];
    console.log("delete record: ", albumId[prop]);
    console.log(records);
    return records;
  }
  //If prop isn't tracks and value isn't an empty string, assign the value to that 
  // album's prop.(ie, to change the existing value)
  else if (prop !== "tracks" && value !== ""){
    albumId[prop] = value;
    console.log(records);
    return records;
  }
  //If prop is tracks and value isn't an empty string, add the value to the end of the 
  // album's tracks array.(ie, to add a new track at the end of the array)
  else if (prop === "tracks" && value !== ""){    
    if (!checkTracksExists){
      //add the array object to the end of the list of properties for ablumId  
      albumId[prop] = Array.of(value);
      console.log("new tracks: ", albumId[prop]);
      console.log(records);
      return records;
    }
    else {
      albumId.tracks.push(value);
      console.log("push tracks: ", albumId.tracks.push(value));
      console.log(records);
      return records;
    }
  }
}
  
updateRecords(recordCollection, 5439, 'artist', 'ABBA');
updateRecords(recordCollection, 5439, 'tracks', 'Take a hance on Me');
updateRecords(recordCollection, 2548, 'artist', '');
updateRecords(recordCollection, 1245, 'tracks', 'Addicted to Love');
updateRecords(recordCollection, 2468, 'tracks', '');
updateRecords(recordCollection, 1245, 'albumTitle', 'Riptide');

/*iterate with Javascript While loops
Add the numbers 5 through 0 (inclusive) in descending order to myArray using a while loop*/
const myArray = [];

let i = 5;

while (i >= 0) {
myArray.push(i);
console.log(myArray);
i--;
}

/*iterate with Javascript For Loops*/
const myForArray = [];

for (let i = 1; i < 6; i++){
  myForArray.push(i);
  console.log(myForArray);
}

/*iterate Odd numbers with a For Loop
hint is here: https://www.freecodecamp.org/news/javascript-for-loops/
change the initial expression, not the final expression!*/
const myOddArray = [];

for (let i = 1; i < 10; i += 2){
  myOddArray.push(i);
  console.log(myOddArray);
}

/*count backwards with a for loop*/
const myBackwardsArray = [];

for (let i = 9; i > 0; i -= 2){
  myBackwardsArray.push(i);
  console.log(myBackwardsArray);
}

/*iterate through an array with a for loop */
const myArr = [2, 3, 4, 5, 6];
let total = 0;

for (let i = total; i < myArr.length; i++){
	total += myArr[i] ;
  console.log(myArr[i]);
  console.log(total);
  //myArr.length = 4,
  //total = 0, myArr[i] = 2, => 2
  //total = 2, myArr[i] = 3, => 5
  //total = 5, myArr[i] = 4, => 9
  //total = 9, myArr[i] = 5, => 14
  //total = 14, myArr[i] = 6, => 20
  
  //i = myArr.length, loop ends
}

/*Nesting For loops */
function multiplyAll(arr){
  let product = 1;
//outer For loop
for(let i = 0; i < arr.length; i++){
	console.log('[' + i  + '] = ' + arr[i]);
  //inner For loop:
  for(let j = 0; j < arr[i].length; j++ ){
  	product *= arr[i][j];
    console.log('[' + i + ',' + j + '] = ' + arr[i][j]);
    console.log("inner mulitplication: ", product);
    
  	}
	}
	console.log("outer mulitplication: ", product);
  return product;
}

//multiplyAll([[1, 2], [3, 4], [5, 6, 7]]);
//multiplyAll([[1], [2], [3]]);
multiplyAll([[5, 1], [0.2, 4, 0.5], [3, 9]]);


/*iterate with Javascript do...while loops */
const myDoWhileArray = [];
let i = 10;

do {
	myDoWhileArray.push(i);
  console.log("myDoWhileArray: ", myDoWhileArray);
  i++;
}
while (i < 5);

/*Replace Loops using Recursion*/
function sum(arr, n){
	if(n <= 0){
  	return 0;
  } else {
  	console.log(sum(arr, n - 1) + arr[n - 1]);
  	return sum(arr, n - 1) + arr[n - 1];
  }
}

//sum([1], 0);
//sum([2, 3, 4], 1);
sum([2, 3, 4, 5], 3);

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

	//console.log("propExists: ", propExists);

	//for(let i = 0; i < contacts.length; i++){  	
    
    	//check if the name === firstName in the array and the prop === given property of that contact
      if(firstNameProp === undefined){
        console.log("No such contact");
        return "No such contact";
      }
      else if(!propExists){
        console.log("No such property");
        return "No such property";
      }
      else {
      console.log("propArray: ", propArray);
        return propArray;
      }   
   
   //}
   }



lookupProfile("Akira", "likes");
lookupProfile("Kristian", "lastName");
lookupProfile("Sherlock", "likes");
lookupProfile("Harry", "likes");
lookupProfile("Bob", "number");
lookupProfile("Bob", "potato");
lookupProfile("Akira", "address");



  