'use strict';
// the function is declared in the global scope
function calcAge(birthYear) {
  // age is declade in the variable enviroment
  const age = 2021 - birthYear;
  // console.log(firstName); // we can acess firstName because it was declared in the global enviroment,and it is it's parent.
  function printAge() {
    // it goes to it's parent scope to find the age var and the birthYear.
    const output = `${firstName} ,You are ${age} born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var mallenial = true;
      const str = `Oh, you're a mallenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      var temp = add(5, 6);
      console.log(temp);
      //output = 'ELAD reassigned';
    }

    // can't access str from outside it's block scope
    // console.log(str);
    //can acess it because it's var. and not const or let. var variabels don't care about block scope.
    console.log(mallenial);

    // we can't access function in another scope - it means functions are block scope like const and let.
    // but if we cancel the 'use - strict' we will be able to access it.
    //console.log(add(5, 6));

    //if we log here output it will be reassigend to "ELAD reassigned"
  }

  printAge();
  return age;
}

// global variable

// because the function call gets inside to the Call Stack before the initailize of the global variable,
//the FirstName var won't be accessiable from within the calcAge function.
// the functions is the first argument the excutes in the call stack so because of that it doesn't know firstName from the global.
/////////calcAge(1997);
/////////const firstName = 'Elad';

//we have to do it like this.
const firstName = 'Elad';
calcAge(1993);

//no access to them
//console.log(age);
//printAge();
//

/////////////// HOISTINGGGGGGGGGGGGG/////////////////////

console.log(me); // can access to var bedore declartaion but its undefiend.
//console.log(job); // can't access to TDZ of let/const variable (Temporary dead zone).
//console.log(year); // same as let varaible.

var me = 'elad';
let job = 'Teacher';
const year = 1993;

let temp = addDeclaraaion(6, 7);
//console.log(temp);

function addDeclaraaion(a, b) {
  return a + b;
}

//WORKS;

//let temp2 = b(6, 7);
//console.log(temp2);
let b = function addExpression(a, b) {
  return a + b;
};

//DOESNT WORK because has no hoisting - same as Arrow function

/////////// example of simple mistake using var/////////////

if (!numProductos) {
  // because we try to access var varaible here be4 it's declartion we will get undeined , and !undefind = true. it will enter the function.!!!
  deleteShopingCart();
}

var numProductos = 10;

function deleteShopingCart() {
  console.log('deleted');
}

/////////// THIS KEY WORD/////////////// always points to the object called it.

console.log(this); // the Global window .
gogo();

function gogo() {
  let year = 5;
  console.log(this); // undefined in functions declartions ,except if it's inside object.
  let b = () => {
    console.log(this); // it is the this key word that belongs to its parent (in this case to gogo and its undefined).
    year += 10; // if we will do this.year+=10 it won't recoginize it , arrow functions don't have this key word.
  };

  b();

  console.log(year);
}

// in objects don't use arrow function as method object.

const sivanna = {
  firstname: 'sivan',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(this.firstname);
    // returns the father, which is the calcAge and calc age father is sivanna so return this object
    const geeting = () => console.log(this);
    geeting();

    const self = this; // we take the this that points to sivanna object from within the calcAge that is function as object method.

    const isMillnieal = function () {
      // we use self because in normal declartion fucntions that are'nt object method the this key word is undeifned.
      console.log(self.year >= 1981 && self.year <= 1996);
    };

    isMillnieal();

    // if we use arrow function we don't need the self because arrow function key word belongs to it's parent.
  },
  // this return the window (the parent), this will not work
  greet: () => console.log(this.firstname),
  // this will work , this key word of declartion function it's the object called it, and this is again object method
  // so this key word points to the object.
  greet2: function () {
    console.log(this.firstname);
  },
};
sivanna.calcAge();
sivanna.greet2();

////////////////// ARGUMETNS keyword////////////////////////

const addExpr = function (a, b) {
  console.log(arguments); // returns the parameters that we recieved into the function
};
addExpr(2, 5); // we will recieve an object that we see 2 , 5 there
addExpr(1, 2, 3, 4, 5, 6, 7, 8); // we can send many parameters even if not specified in the function

let addArrow = (a, b) => {
  console.log(arguments);
  // arguments not avilable in arrow functions
};

////////////////PRIMITVE VS OBJCET //////////////////////////
// primitive types they both refer to the same address in the call stack, once one is changing the changed one points to a new address.
// primitive types in JS are immutible - so oldAge = age they will point to the same address untill one changes.
let age = 30;
let oldAge = age;
age = 31;

//console.log(age); // 31
//console.log(oldAge); //30

// when creating an obejet the variable is in the call stack(me) and in its address there is another address that is in the heap.
// and there all the object info is.

const me = {
  name: 'elad',
  age: 30,
  family: ['vivi', 'moshe'],
};

const friend = me;
friend.age = 27;

// the age of elad also changes to 27 --- shallow copy. same reference.
//if we want a new object which means deep copy(only first level - only primitive ) - we use  const friend = Object.assign({}, me)
// but if there was another object in this object it will be shallow copy.(family arr example. if i change the arr in on of them,it will change in the other too.)
//console.log(me);
//console.log(friend);
