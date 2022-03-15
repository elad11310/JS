// strict mode - to write secure js code
// to avoid bugs , it will create visible errors in some points that js wont.
"use strict";

// here an exmaple for 'use strict' help
let hasDriversLicense = false;
const passTest = true;

if (passTest) {
  // hasDriversLiense = true; // because i didnt write the var name good
  // the ' use strict' will tell me this in the console
}
if (hasDriversLicense) {
  console.log("I can drive");
}

//const private = 123; // also mistake will be shown becase use strict.

// Functions - pieace of code for reuse.

function logger() {
  console.log("My name is Elad");
}

logger();

// function declartion
function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

// annonimous function - an expression function , kept in variable
const calcAge = function (birthYear) {
  return 2021 - birthYear;
};

const age = calcAge(1993);
console.log(age);

// whats the difference between function declartions(normal) to function expression
// in annonmious we have to first define the function , in declartion function
// we can call it and then define it

// we can use either this or this.

//Arrow functions , like experssion function but without the function word and without the return.

const calcAge2 = (birthYear) => 2021 - birthYear;

const age2 = calcAge2(1993);
console.log(age2);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2021 - birthYear;
  const retirment = 65 - age;
  //return retirment;
  return `${firstName} retires in ${retirment} years`;
};

console.log(yearsUntilRetirement(1993, "Elad"));

// calling function from inside of another function

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor2(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of 
  apples and ${orangePieces} pieces of oranges.`;
  return juice;
}

console.log(fruitProcessor2(2, 3));

//ARRAYS

const friends = ["Elad", "Steven", "Peter"];
const years = new Array(1993, 2001, 2009);

console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

// array can be of multiple types.
const elad = ["Elad", "Wien", 2021 - 1993, friends];

//Array methods
// push - insert at the end of the array.
const newLength = friends.push("Shani");
console.log(friends);
console.log(newLength);

//unshift - insert at the begining of the array
friends.unshift("Viki");
console.log(friends);

// pop - retrieve the last element and remove it
const popped = friends.pop();
console.log(friends);
console.log(popped);

//shift - retrieve the first and remove it

const shifted = friends.shift();
console.log(friends);
console.log(shifted);

// indexof

console.log(friends.indexOf("Elad"));

// includes - return true if the element is in the array other wise false

console.log(friends.includes("Elad"));

// OBJECTS
//Literal syntax :

const eladObj = {
  firstName: "Elad",
  lastName: "Wien",
  age: 2021 - 1993,
  job: "Programmer",
  friends: ["Elad", "Steven", "Peter"],
};

console.log(eladObj);

// 2 ways of getting property
// dot and brackets

console.log(eladObj.lastName);
console.log(eladObj["lastName"]);

const nameKey = "Name";
console.log(eladObj["first" + nameKey]);
console.log(eladObj["last" + nameKey]);

const interestedIn = prompt("What do you want to know about elad?");

if (eladObj[interestedIn]) {
  console.log(eladObj[interestedIn]);
} else {
  console.log("Wrong request!");
}

//add new property using dot,brackets

eladObj.location = "Israel";
eladObj["dog"] = "Peter";
console.log(eladObj);

console.log(
  `${eladObj.firstName} has ${eladObj.friends.length} friends, and his best friend is called ${eladObj.friends[2]} `
);

// Objects Methods

const eladObj2 = {
  firstName: "Elad",
  lastName: "Wien",
  birthYear: 1993,
  job: "Programmer",
  friends: ["Elad", "Steven", "Peter"],
  hasDriverLicense: true,

  // function that is also a propery of this object
  //   calcAge: function () {
  //     return 2021 - this.birthYear;
  //   },

  // function that is also a propery of this object
  calcAge: function () {
    this.age = 2021 - this.birthYear;
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${
      this.job
    } and he has ${this.hasDriverLicense ? "a" : "no"} driver's license.`;
  },
};

console.log(eladObj2.calcAge());
console.log(eladObj2.age);
console.log(eladObj2["calcAge"]());
console.log(eladObj2.getSummary());

// LOOPS

for (let i = 1; i <= 10; i++) {
  //bla bla...
}

// making random dice number with Math.random and Math.trunc to round the results

// Math.random() * 6 - number between 0-5
let dice = Math.trunc(Math.random() * 6) + 1;
