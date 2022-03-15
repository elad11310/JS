'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// this function will show the movments of the user.
// deposit or withdrawl.
// we use the html row div , and check the type.
const displayMovments = function (movments, sort = false) {
  containerMovements.innerHTML = ''; // clearing the default movments.

  // creating a copy using slice, we dont want to sort the original array
  const moves =
    sort === true ? movments.slice().sort((a, b) => a - b) : movments;

  moves.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `     
       <div class="movements__row">
        <div class="movements__type
        movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
     </div>`;

    // now we neet to insert this row.

    containerMovements.insertAdjacentHTML('afterbegin', html); // afterbegin means at the top of the list. (look mdn insertAdjacentHTML for more options).
  });
};

// display movments balance

const movementsBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, curr) => acc + curr, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

/////////////////////////////////////////////////

// for calc the income, out come
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  // suppose the bank pays an interest on each deposit
  // but only in deposits that thier intreset rate is above 1 euro
  const interest = acc.movements
    .filter(mov => mov > 0) // taking all deposits
    .map(deposit => (deposit *= acc.interestRate / 100)) // calculate thier intreset
    .filter(int => int >= 1) // only if the interest is larger then 1 euro
    .reduce((acc, int) => acc + int, 0); // sum them

  labelSumInterest.textContent = `${interest}€`;
};

const createUserNames = function (accs) {
  // split returns an array so we can use map on it.
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(elment => {
        return elment[0];
      })
      // untill here we got ['s','t','w'] for Steven Thomas Williams
      // .join is for to unpack it from the array
      .join('');
  });
};
createUserNames(accounts);
console.log(accounts);
accounts.forEach(function (ele) {
  console.log(ele.userName);
});

// EVENT HANDLERS
// login

let currecntAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent the from from submitting, avoid reloading the page cause it's form
  e.preventDefault();

  // check user name
  currecntAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currecntAccount);
  // check password validity

  // the ? is only in case if the account exsits ( found in find function above)
  if (currecntAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and hello message
    labelWelcome.textContent = `Welcome back ,${
      currecntAccount.owner.split(' ')[0]
    }`;
    // UI
    containerApp.style.opacity = 100;
    // clear the input fields.

    inputLoginUsername.value = inputLoginPin.value = '';

    // to stop from the password field to lose it's focus
    inputLoginPin.blur();

    // Display movements,balance and summary.

    updateUI(currecntAccount);
  }
});

const updateUI = function (currentAccount) {
  displayMovments(currecntAccount.movements);
  movementsBalance(currecntAccount);
  calcDisplaySummary(currecntAccount);
};

// Transfer money

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amountToTransfer = Number(inputTransferAmount.value);
  // trying to find the account based on the username (js,jd,stw....)
  const accountToTransfer = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  console.log(amountToTransfer, accountToTransfer);

  // clean the fields input
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  // check if the amount > 0 and if the person who transfers has enough money to do that.
  // and also check that we dont transfer money to ourselves.
  // and if the receiver exists
  if (
    amountToTransfer > 0 &&
    accountToTransfer &&
    currecntAccount.balance >= amountToTransfer &&
    accountToTransfer?.userName !== currecntAccount.userName
  ) {
    currecntAccount.movements.push(-amountToTransfer);
    accountToTransfer.movements.push(amountToTransfer);

    updateUI(currecntAccount);
  }
});

/// LOAN

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  // make condition for the load except of checking amount validity
  if (
    amount > 0 &&
    currecntAccount.movements.some(mov => mov >= amount * 0.1)
  ) {
    currecntAccount.movements.push(amount);
    updateUI(currecntAccount);
    inputLoanAmount.value = '';
  }
});

/// SORT
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  displayMovments(currecntAccount.movements, !sorted);
  sorted = !sorted;
});

/// CLOSE ACCOUNT

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currecntAccount.userName &&
    Number(inputClosePin.value) === currecntAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currecntAccount.userName
    );
    // Delete account
    accounts.splice(index, 1);
    console.log(accounts);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  inputClosePin.blur();
});

/////////////////////////////////////////////////

// LECTURES

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE method
// slice method doesn't change the original array, it's creates new one
console.log(arr.slice(2)); // c,d,e
console.log(arr.slice(2, 4)); // c,d
console.log(arr.slice(-2)); // d,e
console.log(arr.slice(-1)); // e
console.log(arr.slice(1, -2)); // b,c

// shallow copy
console.log(arr.slice());
console.log([...arr]);
// both ways are fine , matter of personal preference

// Splice method - changes the original array

console.log(arr.splice(2)); // c,d,e
console.log(arr); // a,b

// delete last element using splice
arr.splice(-1);

arr = ['a', 'b', 'c', 'd', 'e'];
// will delete b and c .
// the second parameter is how many cells to delete
arr.splice(1, 2);
console.log(arr);

// REVERSE
// revese also changes the original array
arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse());

// CONCAT
// doesn't change the original array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);
// both ways are fine , matter of personal preference

// JOIN

console.log(letters.join('-'));
console.log();

// AT method

const arr3 = [23, 11, 64];

// getting first element
console.log(arr3[0]);
console.log(arr3.at(0));

// getting last element
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
console.log(arr3.at(-1));

// if we want to take the last element of the array or start counting from the end
// we should probably use the "at" method.
// also if we want to do method chaining - the "at" method is perfect for that.
// the "at" method works fine on strings
// on the other hand if you want just to get quickly value from array - use brackets notation.(squared brackets)

// FOR EACH LOOP

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const [i, movment] of movements.entries()) {
  if (movment > 0) {
    console.log(`movment number ${i + 1} you deposited ${movment}`);
  } else {
    console.log(`movment number ${i + 1} you withdrew ${Math.abs(movment)}`);
  }
}

// for each is a higher order fucntion - gets a call back function to tell it what to do
// each iteration will excute this call back function and receive the current element of the array(movment).
// function(200) - first iteration
//function(450) - second iteration
//....
movements.forEach(function (movment, index, array) {
  // first element is the array value,second is the index, third is the whole array (index and value) . you can specify only movment or movment and index or all.
  if (movment > 0) {
    console.log(`movment number ${index + 1} you deposited ${movment}`);
  } else {
    console.log(
      `movment number ${index + 1} you withdrew ${Math.abs(movment)}`
    );
  }
});

// one thing the foreach loop differs from the for of loop is that in for each we can't put break statement.
// it will always loop the entire array.

// FOR EACH with maps and sets.

// MAP
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});

// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);

currenciesUnique.forEach(function (value, _, map) {
  // key and value are the same in set.
  console.log(`${value} : ${value}`);
});

// Coding challenge

// test data 1
const juliaArray1 = [3, 5, 2, 12, 7];
const kateArray1 = [4, 1, 15, 8, 3];

// test data 2

const juliaArray2 = [9, 16, 6, 8, 3];
const kateArray2 = [10, 5, 6, 1, 4];

const checkDogs = function (juliaArr, kateArr) {
  // removing the first and the two last elements.
  const juiaNewArr = juliaArr.slice(1, juliaArr.length - 2);
  // join the arrays
  const joinedArr = juiaNewArr.concat(kateArr);

  joinedArr.forEach(function (val, i, arr) {
    console.log(
      `dog number ${i + 1} is `,
      val >= 3 ? `an adult and is ${val} years old` : `still a puppy 🐶 `
    );
  });
};

checkDogs(juliaArray1, kateArray1);

// 3 main methods in arr (also loops on the array each method)
// map - returns new arr containing the result of applying opeartion on all original array elements.(current*2 for example)
// filter - returns new arr contining the arr elements that passed a specific test condition(current>2 for rxample)
// reduce -  returns new value and reduces all arr elements into single value (adding all elements together for example acc(accumulator) + current )

// MAP
const euroToUsd = 1.1;
const movmentsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
});

// arrow function in one line
const arrowMovmentUsd = movements.map(mov => mov * euroToUsd);

console.log(movements);
console.log(movmentsUSD);

// same thing with for of loop
const arrUsd = [];
for (const mov of movements) {
  arrUsd.push(mov * euroToUsd);
}
console.log(arrUsd);

// FILTER
//filter the negative values.
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);

// in regular for of loop
const depositArr = [];

for (const deposit of movements) {
  if (deposit > 0) {
    depositArr.push(deposit);
  }
}

console.log(depositArr);

// all withdrawls in arrow function

const withdrawls = movements.filter(mov => mov < 0);
console.log(withdrawls);

// REDUCE

const balance = movements.reduce(function (acc, curr, i, arr) {
  return acc + curr;
}, 0); // the starter accumulator value
console.log(balance);

// arrow function

const balance2 = movements.reduce((acc, curr) => acc + curr, 0);

console.log(balance2);
// regular for of
let balance3 = 0;

for (const mov of movements) {
  balance3 += mov;
}
console.log(balance3);

// Maximum value of movments array

const max = movements.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);

console.log(max);

// with arrow function

const max2 = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
console.log(max2);

// Coding Challange

const calcAverageHumanAge = function (dogsArr) {
  // first convert dog age to human using map
  const humanAges = dogsArr.map(function (dog) {
    if (dog <= 2) {
      return dog * 2;
    } else {
      return 16 + dog * 4;
    }
  });

  // filtering all the dogs that thier human age is < 18
  const adultDogs = humanAges.filter(function (dog) {
    return dog >= 18;
  });

  // same as arrow function
  // const adultDog = humanAges.filter(dog => dog >= 18);

  // calculate the avg using reduce

  // const averageAge = adultDogs.reduce(function (acc, dog) {
  //   return acc + dog;
  // }, 0);

  // same as arrow function
  const averageAge =
    adultDogs.reduce((acc, dog) => acc + dog, 0) / adultDogs.length;

  return averageAge;
  //return averageAge / adultDogs.length;
};

const avg = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(avg);

// Chaining Methods (PIPELINE) - it has one problem to debugg , so we will add the arr into the parameter to log.
// using all the methods in one time
// filter and map returns new array , reduce return new value
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    console.log(arr); // middle step to check if the arr is good here after filter (for debug)
    return mov * euroToUsd;
  })
  // if i dont want debug i will use the line below for map.
  //.map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

// Coding Challange

const calcAverageHumanAgeChainMethod = function (dogsArr) {
  const avg =
    dogsArr
      .map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4))
      .filter(dogAge => dogAge >= 18)
      .reduce((acc, dogAge, i, arr) => acc + dogAge, 0) / arr.length;

  return avg;
};

console.log(calcAverageHumanAgeChainMethod([5, 2, 4, 1, 15, 8, 3]));

// FIND METHOD
// Doesnt return new array , return the first element that statisfy the condition

const firstWithdrawl = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawl);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// FIND INDEX METHOD - in the Delete account above

// INCLUDES METHOD
// Testing for equality
console.log(movements);
console.log(movements.includes(-130));

// exactly the same using some
console.log(movements.some(mov => mov === -130));

// SOME METHOD
// if we want to test for condition
const anyDeposit = movements.some(mov => mov > 0);
console.log(anyDeposit);

// EVERY METHOD
// every returns true only if the all elements returns true on the condition.

console.log(movements.every(mov => mov > 0));
// this account with positive movements only.
console.log(account4.movements.every(mov => mov > 0));

// we can make a call back function and then use it in more then 1 higher order function
// SEPERATE CALLBACK
const deposit = mov => mov > 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));

// FLAT METHOD
// converting the nested arr to simple arr
const arrToFlat = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrToFlat.flat());

const arrDeeperToFlat = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeeperToFlat.flat()); // we still got 2 nested arr , which means flat works on 1 level ot deep
// so fix it
console.log(arrDeeperToFlat.flat(2));

// suppose we want to calculate all accounts balance
// taking all the accounts movments into arr

const accountsMovments = accounts.map(acc => acc.movements);
console.log(accountsMovments);

// now we want all movments in 1 arr and not nested

const allMomventsFlat = accountsMovments.flat();
console.log(allMomventsFlat);

const overallBalance = allMomventsFlat.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// with chaining methods.

const overallBalanceChain = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceChain);

// FLAT MAP - combines map and flat functions
// flat map goes into 1 level deep so if we need to go deeper , use normal flat.
const overallBalanceChain2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalanceChain2);

// SORTING ARRAYS
// Strings

const owners = ['Elad', 'Omer', 'ABA', 'EIMA'];
console.log(owners.sort());

console.log(movements);
console.log(movements.sort()); // doesn't sort well, because this sort works good on strings, it's sorts on strings

// we need to pass compare call back function
// return < 0 - a will be before b
// return > 0 b will be before a
// console.log(
//   movements.sort((a, b) => {
//     if (a > b) {
//       return 1;
//     }
//     if (b > a) {
//       return -1;
//     }
//   })
// );

movements.sort((a, b) => a - b);
console.log(movements);

//  MORE WAYS OF CREATING ARRAYS AND FILLING THEM

const ARR = [1, 2, 3, 4, 5, 6, 7];
console.log(ARR);
console.log(new Array(1, 2, 3, 4, 5));

const x = new Array(7); // opens an array in size of 7 empty cells
console.log(x);
x.fill(1); // fill the entire array with the specific value
console.log(x);

// can specify index to begin fill
ARR.fill(23, 2, 6); // [1,2,23,23,23,23,7]

// Array.form
// better then use new Array and then fill it

const y = Array.from({ length: 8 }, () => 6);
console.log(y);

// like using map function on empty array
// _ cause we dont need to value atm.
const z = Array.from({ length: 9 }, (_, i) => i + 1);
console.log(z);

// suppose we don't have the movments array and we want to calculate thier sum.
// we will use queryselectorall to get all the UI values and will use Array.from to transfer it to actual array.

const callback = ele => Number(ele.textContent.replace('€', ''));
// only when we click on the balance because we want to get all the rows we we logged into the user.
labelBalance.addEventListener('click', function () {
  const allMovmentsValues = Array.from(
    document.querySelectorAll('.movements__value'),
    callback // this is the callback function to extract only the text value (because there are alot of stuff in the html),
    //and delete the euro sign and convert it to number
  );

  console.log(allMovmentsValues);

  // another way to do it , this time we have to do the map seperatly.

  const allMovmentsValues2 = [
    ...document.querySelectorAll('.movements__value'),
  ];
  console.log(allMovmentsValues2);
  console.log(allMovmentsValues2.map(callback));
});

// WHICH ARRAY METHOD TO USE IN ANY SITUATION ?
// we have to ask ourselves the following questions :
// we want to :
// 1) to mutate the original array? (Add : push(end) , unshift(start))
// remove from original array(pop (end) , shift(start), splice(any))
// others : reverse, sort,fill
// 2) a new Array? (map(computed from original) , filter(filtered using condition) , Slice(portion of the original))
//  Concat(adding original to another) , flat , flatMap
// 3) an array index? (findIndex - based on test condition in the callback function) ,indexof based on value
// 4) an array element? find - based on test condition in the callback function
// 5) to know if array includes? (includes - based on value , some, every - based on test condtion in the callback function)
// 6) a new string? to convert array to string - join method - based on seperator string
// 7) to transform to value? reduce method - based on accumulator and callback function
// 8) just to loop on array - forEach loop - based on call back - doesn't create new array

// calculate all the deposits of all the accounts in the bank

const bankDeposits = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);

console.log(bankDeposits);

//count how many deposits in the bank with at least 1000$

const bankDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000).length;

// another way with reduce

const bankDeposits10002 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => (mov > 1000 ? acc + 1 : acc), 0);
console.log(bankDeposits1000);
console.log(bankDeposits10002);

// using reduce to calculate the sum of the deposits and withdrawl into an object
// sums - the accumulator here is equal to the initial object.
// we need to explicity return it cause it's inculde brackets.
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawls += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawls'] += cur;
      return sums;
    },
    { deposits: 0, withdrawls: 0 }
  );
console.log(sums.deposits, sums.withdrawls);

// convert a string to title case
// example - this is a nice title -> This Is a Nice Title

const convertTitle = function (title) {
  // exceptions arr
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];

  // call back function
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  // all the steps combine in chaining methos:
  const combined = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)));

  return combined.join(' ');

  // by seperate steps

  // lower case all the string first
  title = title.toLowerCase();
  // after convert to array
  const splited = title.split(' ');

  const titled = splited.map(ele => {
    if (!exceptions.includes(ele)) {
      return ele[0].toUpperCase() + ele.slice(1);
    } else {
      return ele;
    }
  });
  return titled.join(' ');
};

console.log(convertTitle('this is a nice TITLE'));

// Coding Challange

const dogs = [
  { weight: 22, currFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, currFood: 200, owners: ['Matilda'] },
  { weight: 13, currFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, currFood: 340, owners: ['Michael'] },
];

// 1) loop on the array and add recommend dog's food to each dog object

dogs.forEach(function (dog) {
  dog.recommended = Math.trunc(dog.weight ** 0.75 * 28);
});

console.log(dogs);

// 2) find Sarah dog and log to console weather it's eating too much or too low

const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  sarahDog?.currFood > sarahDog?.recommended
    ? 'Eating too much'
    : 'Eating too low'
);

// 3) create array containing all the owners of dogs who eat too much and array contains those who's dogs eat too little

const ownersEatTooMuch = dogs
  .filter(dog => dog.currFood > dog.recommended)
  .flatMap(dog => dog.owners);

const ownersEatTooLow = dogs
  .filter(dog => dog.currFood < dog.recommended)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLow);

// 4) log to console the names of owners

console.log(`${ownersEatTooMuch.join(' and ')}'s
   dogs eat too much! 
    ${ownersEatTooLow.join(' and ')}'s
     dogs eat too low!`);

// 5) log to console if there's a dog who eat exactly the recommended (true or false)

console.log(dogs.some(dog => dog.currFood === dog.recommended));

// 6)  log to console if there's a dog who eat  the okay (true or false) current > recommend * 0.9 && curret < recommended *1.10

// call back function

const dogEatsOk = dog =>
  dog.currFood > dog.recommended * 0.9 && dog.currFood < dog.recommended * 1.1;

console.log(dogs.some(dogEatsOk));

// 7) array contining dogs who's eats ok

const dogsEatOkArr = dogs.filter(dogEatsOk);
console.log(dogsEatOkArr);

// 8) create shallow copy and sort it by recommended food portion

const dogsSort = dogs
  .slice()
  .sort((dog1, dog2) => dog1.recommended - dog2.recommended);
console.log(dogsSort);
