let js = "amazing";
console.log(40 + 8 + 23 - 10);

//let firstName = "Jonas";
const PI = 3.1415;
let language;
console.log(language); // undefined in console
//console.log(typeof firstName); // string

// the varaible in js is dynamic.
let dynamicVar = true;
console.log(dynamicVar); // true
dynamicVar = "YES";
console.log(dynamicVar); // YES
console.log(typeof null); // will be object but its JS bug

// let - variabels that can change later
// by default better to use const unless we know for certain the variable is gonna change.
// var - old way to declare variable (global varaible)
//age = 56; //we didnt declare var,let or const - automatically will be global.
pow = 2 ** 3; // 8

//assignment operators:

console.log(10 - 5 > 10 - 7); // true math operators excutes first before comparison operators.

//define 2 variables

let x, y;
x = y = 25 - 10 - 5; // y=10 , x=10  - assignment is from right to left. math is from left to right.

// ex 1 - calaulte BMI
const marksWeight = 78;
const markHeight = 1.69;
const johnWeight = 92;
const johnHeight = 1.95;

const makrsBmi = marksWeight / markHeight ** 2;
const johnBmi = johnWeight / johnHeight ** 2;

let isHigherMarksBmi = makrsBmi > johnBmi;
console.log(isHigherMarksBmi);

// strings , template strings
const firstName = "Elad";
const job = "Programmer";
const birthYear = 1993;
const year = 2021;

const elad =
  "I'm " + firstName + ", a " + (year - birthYear) + "years old " + job + "!";
console.log(elad);

//better way
const eladNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(eladNew);
console.log(`Just a regular string...`);

console.log("String with \n\
multiple \n\
lines");

//better way

console.log(`String
multiple
lines`);

//check if we can have a driving lisense.
const age = 19;
const isOldEnough = age >= 18;

if (isOldEnough) {
  console.log("You can have a driving lisense");
} else {
  const yearsLeft = 18 - age;
  console.log(`You are too young. please wait ${yearsLeft} years`);
}

let century;
const birthYear2 = 1993;
if (birthYear2 <= 2000) {
  century = 20;
} else {
  century = 21;
}

console.log(century);

// type conversion - when we explicity want to convert from 1 type to another
// type coercion - js is converting behind the beackground for us
// type conversion --

const inputYear = "1993";
// converting string to number
console.log(Number(inputYear));
console.log(Number(inputYear) + 18);
//NaN - not a number. type of this - number lol.
// convert number to string
console.log(String(23), 23);

//type coercion --
// + triggers coercion. + converts numbers to string
console.log("I am" + 23 + "years old");
// - triggers coercion. - converts string to numbers
console.log("23" - "10" - 3); // 10 converted to numbers.
// / triggers coercion / converts string to number
console.log("23" / "2");
// > triggers coercion
console.log("23" > "18"); // true

let n = "1" + 1; // 11 because + converts numbers to string
n = n - 1; // 10 because - converts string to numbers
console.log(n);

2 + 3 + 4 + "5"; // 95
"10" - "4" - "3" - 2 + "5"; // 15

// 5 false values 0,'',undefined,null ,Nan

console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean("elad")); // true
console.log(Boolean({})); // empty object - true
console.log(Boolean("")); // false

const money = 0;
if (money) {
  // money = 0 so falsy value
  console.log("Don't spend it all");
} else {
  console.log("You should get a job!");
}

// Equality operators.

const agee = 18;
//strict equality - doesnt use type coercion, we get an equility only if they
// are from the same type and equal. to avoid bugs better use this.
if (agee === 18) {
  console.log("You just became an adult");
}
// == use type coercion , make conversion and check equlity
const num = 0;
if (num == "0") {
  console.log("yes its true");
}

// input from the user
const favourtie = prompt("Whats your favourite number?");
console.log(favourtie); // type of string.

// const favourtie2 = Number(prompt("Whats your favourite number?"));
// console.log(favourtie); // type of number.

if (favourtie == 8) {
  console.log("cool");
}

// if (favourtie2 === 8) {
//   console.log("cool2");
// }

if (favourtie !== 8) {
  // strict so 8 != '8'
  console.log("Why not 8?");
}

// Boolean logic

const hasDriverLicense = true; //A
const hasGoodVision = true; // B

console.log(hasDriverLicense && hasGoodVision); // true

//Statements and Experssions
// experssion produce values.
// 3+4 = expression , if - statement

// conditional (Ternary) operator - brief if

const agE = 23;
age >= 18
  ? console.log("i like to drink wine")
  : console.log("I like to drink water");

// we use the ternary more like this :

const drink = agE >= 18 ? "wine" : "water";
console.log(drink);

console.log(`I like to drink ${agE >= 18 ? "wine" : "water"}`);
