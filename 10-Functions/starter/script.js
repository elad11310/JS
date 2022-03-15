'use strict';

//  FUNCTIONS //

//default parameters

const bookings = [];

const createBooking = function (
  flightNum,
  passengersNum = 1,
  price = 199 * passengersNum
) {
  // old fashion for default parameters. ES5
  //passengersNum = passengersNum || 1;
  //price = price || 199;
  const booking = {
    flightNum,
    passengersNum,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');

createBooking('LH1234', 2, 800);
// to make passengerNum to be default
createBooking('LH1234', undefined, 800);

// pass arguments to functions - by value or by reference.

const flight = 'LH123';
const elad = {
  name: 'Elad Weinbrand',
  passport: 12345667,
};

const checkIn = function (flightNum, passenger) {
  // we sent here 1 primitive variable (flightNUm) and an object reference
  // so the primitive variable is sent as a copy and won't be changed outside the function.
  // the object is sent by reference so we can change it's inner values and it will be changed outside the function.
  flightNum = 'EE12';
  passenger.name = 'Mr. ' + passenger.name;
};

checkIn(flight, elad);
console.log(flight);
console.log(elad);

//First class functions - feature of languages.

// JS treats functions as first class functions -this means that functions are simply values.
// we can store functions in varaibles (expression functions).
// we can pass functions as arguments to another functions.(event click instance)
// return fucntions from functions.
// because JS is furst class functions we can write higher order fucntions - that means that this function can either
//receive a function as a parameter or return one , or both.
// when we send a function as a parameter - this function called callback function becuase the current function that receied it,
// will call it later.

// function to delete spaces and make lowercase
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

// fucntion to convert first word to uppercase
const uppserFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

console.log(oneWord('Sivan Namah Azari'));
console.log(uppserFirstWord('Sivan Namah Azari'));

// high order function.
const transformer = function (str, fn) {
  console.log(`Transformed string ${fn(str)}`);
  console.log(`Transformed by ${fn.name}`);
};

transformer('Javascript is the best', uppserFirstWord); // upperFirstWord is the call back function. transformer will call it.
transformer('Javascript is the best', oneWord);

const high5 = function () {
  console.log('😍');
};
document.body.addEventListener('click', high5);

['Elad', 'Omer', 'Shani'].forEach(high5);

// callback functions allows us to create abstraction.

//return functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey'); // greeterHey its a function - its the function greet returns.
greeterHey('Elad');
greeterHey('Vika');
greet('Hello')('ddd');

// arrow function instance
const greet2 = (greeting) => (name) => console.log(`${greeting} ${name}`);

const greeterHey2 = greet2('Hey'); // greeterHey its a function - its the function greet returns.
greeterHey2('Elad');
greeterHey2('Vika');
greet2('Hello')('ddd');

// THIS and functiion call back

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
  },
};

lufthansa.book(239, 'Elad Weinbrand');
lufthansa.book(2349, 'Vika Weinbrand');
console.log(lufthansa);

const eurowings = { airline: 'Eurowings', iataCode: 'EW', bookings: [] };

// book has function , book fucntion from lufthansa was return to here.
// now its a regular function and when we call it we need to explicity tell it the current this.
const book = lufthansa.book;
// doesnt work
//book('23', 'Elad v');

// Call method
book.call(eurowings, 23, 'Sara Williams'); // when lufthansa will try to access to this - we excplicity tell it to go to euro wings

console.log(eurowings);

const swiss = {
  airline: 'swiss Air lines',
  iataCode: 'Lx',
  bookings: [],
};
book.call(swiss, 23, 'Mom and shai');
console.log(swiss); // we can see it was inserted); // we can see it was inserted

// Apply method
const flightData = [538, 'George cooper'];
book.apply(swiss, flightData);
console.log(swiss); // we can see it was inserted); // we can see it was inserted
book.call(swiss, ...flightData);

// Bind method
// it already has the this object cause we give it to it in initialliztion of bind function.
const bookEW = book.bind(eurowings);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven shpilberg');
bookLX(27, 'Stefan shpilberg');

// we can do it more specific with flight numer included also in bind

const bookEW23 = book.bind(eurowings, 23);

bookEW23('Duda Duda');

// With event listeners//

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this.planes);
};

lufthansa.buyPlane(); // 301 , it knows the this belongs to lufthansa.

// here the this points to the button so it's not work , need to manually define the this keyword.
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // now it knows the this belongs to lufthnsa using bind

// Partial application

const addTax = (rate, value) => value + value * rate;
//addVat =  value => value + value * rate
console.log(addTax(0.1, 200));

// to addVat returns a function  value => value + value * rate , with the rate inside it already because of the bind.
const addVat = addTax.bind(null, 0.23);

console.log(addVat(100));

// another easy way to write this
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVat2 = addTaxRate(0.2);
console.log(addVat2(200));

/// coding challange

const poll = {
  question: 'Whats your favourite programming language?',
  options: ['0: JS', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0), //[0,0,0,0]
  registerNewAnswer() {
    let answer = Number(prompt(`${this.question}\n${this.options.join('\n')}`));

    // if both 2 first conditions are true , it will make third condition. short circuting
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;

    this.displayResults('string'); // send it with string type parameter
    this.displayResults(); // send it without parameter so the default will be.
  },

  displayResults(type = 'array') {
    // default parameter type is array
    if (type === 'array') {
      console.log(this.answers);
    } else {
      console.log(`Poll results are  ${this.answers.join(', ')}`);
    }
  },
};

// bind is to know that the this belongs to poll
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// if we want to change the this keyword that belongs also to the answers array.(we want to use the fucntion with outside array)
// wiith call
poll.displayResults.call({ answers: [5, 3, 2] }, 'string');

// with bind
const func = poll.displayResults;

const temp = func.bind({ answers: [2, 3, 6] });
temp();

// ONE time run functions
const runOne = function () {
  console.log('It will never run again');
};

runOne();

//IIFE - immeditatly invoke function expression

(function () {
  console.log('It will never run again');
})();

// arrow
(() => console.log('It will never run again'))();

// CLOSURES
// happens automaticlly in certain situations.
// need to recognize it when happens.
//A function has access to the variable environement(VE) of the execution context which it was created
// thats means that booker will have access to passerngerCount even tough after line 284 the secureBook will
// be no longer exists in the call stack, because it was invoked , did it's job and finished and got out side the call stack.
//CLOUSRE : VE attached to the function, exactly as  it was at the time and place the function was created.
const secureBooking = function () {
  let passengerCount = 0; // can't aceess from outside
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// booker is now function.
const booker = secureBooking();

booker();
booker();
booker();

// can inspect the clousre in the console
console.dir(booker);

// more clousure examples.

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();

console.dir(f);

// another example

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  // a callback function that will call the function after wait * 1000 miliseconds - number of seconds.
  setTimeout(function () {
    console.log(`We are now boarding all the ${n} passengers`);
    console.log(`There are 3 groups , each with ${perGroup} passengers`);
  }, wait * 1000);

  // that's will be printed be4 setTimeout logs, because of the delay.
  console.log(`Will start boarding at ${wait} seconds`);
};

// Clousre has priority over the chain scope - so it won't use this.
const perGroup = 1000;
boardPassengers(180, 3);

/// Coding Challange

// it works because of clouser .
//  IIFE - immeditatly invoke function expression and the environement for the callbeck function is created
// even tough it's no longer exists - when we click the screen the the call back function is called,
// it has access to the outer fucntion cause of the clouser.
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').styleaddEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
