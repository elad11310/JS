'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-01-21T17:01:17.194Z',
    '2022-01-25T23:36:17.929Z',
    '2022-01-27T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2021-02-29T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
const elad = document.getElementById('stam');
elad.innerText = 'Sivan';
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

const roundAfterDecimal = 2;

/////////////////////////////////////////////////
// Functions
const displayDateFormat = function (date, locale) {
  const calcDayPassed = (date1, date2) =>
    Math.abs(date1 - date2) / (24 * 60 * 60 * 1000);

  const daysPassed = Math.round(calcDayPassed(new Date(), date));

  if (daysPassed === 0) {
    return 'Today';
  }
  if (daysPassed === 1) {
    return 'Yesterday';
  }
  if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  }
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const displayCurrecnyFormat = function (value, locale, currency) {
  const movNum = Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
  return movNum;
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // using date api
    const date = new Date(acc.movementsDates[i]);
    const displayDate = displayDateFormat(date, acc.locale);

    // using number api

    const movNum = displayCurrecnyFormat(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${movNum}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  paintEverySecondRow();
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  const formatBalanceCurrency = displayCurrecnyFormat(
    acc.balance,
    acc.locale,
    acc.currency
  );

  labelBalance.textContent = `${formatBalanceCurrency}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = displayCurrecnyFormat(
    incomes,
    acc.locale,
    acc.currency
  );

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = displayCurrecnyFormat(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = displayCurrecnyFormat(
    interest,
    acc.locale,
    acc.currency
  );
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
// this varaibels are globel because of the switching accounts properties.
// currentAccount to know the current user, timer for each user to auto log out after x seconds.
let currentAccount, timer;

const startLogInTimer = function () {
  const tick = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    // each call back call , print the timer to user

    labelTimer.textContent = `${minutes}:${seconds}`;

    // when we reach zero sec , stop timer and log out user.s
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    time = time - 1;
  };

  // Set the time to 5 minutes

  let time = 120;
  // Call the timer every 1 sec
  tick();
  const timer = setInterval(tick, 1000);

  // we return the timer to check when gets a new log in if a timer exists and if so cancel it.
  return timer;
};

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Create current date

    const nowDate = new Date();
    // const day = `${nowDate.getDate()}`.padStart(2, 0);
    // const month = `${nowDate.getMonth() + 1}`.padStart(2, 0);
    // const year = nowDate.getFullYear();
    // const hour = `${nowDate.getHours()}`.padStart(2, 0);
    // const min = `${nowDate.getMinutes()}`.padStart(2, 0);
    //labelDate.textContent = `${day}/${month}/${year} , ${hour}:${min}`;

    // using Date API formattor to adjust the date to the current counrty

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // could be long
      year: 'numeric',
      //weekday: 'long',
    };

    // will give the current computer local browser language
    //  const localLanuage = navigator.language;
    //console.log(localLanuage);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(nowDate);

    // check if a previous timer exists
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogInTimer();
    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer

    clearInterval(timer);
    timer = startLogInTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
      // Reset timer

      clearInterval(timer);
      timer = startLogInTimer();
    }, 5000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/// NUMBERS ////
//in JavaScript,
//all numbers are presented internally
//as floating point numbers.
//So basically, always as decimals,
//no matter if we actually write them
//as integers or as decimals.
// all numbers represents in binary format 64 bit.

console.log(23 === 23.0); // true

// Base 10 - 0-0
// Base 2 0-1

console.log(0.1 + 0.2); // 0.33333333334 , there is a problem in JS representing frictions sometimes
console.log(0.1 + 0.2 === 0.3); // returns false , but should be true , error in JS that we hage to accept

// convert string to number

console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30xsds')); // knows to convert to 30

// check if value is NaN - not a number
console.log(Number.isNaN(+'10')); // false
console.log(Number.isNaN(+'10x')); // true

// checking if value is a number

console.log(Number.isFinite(20));
console.log(Number.isFinite('30'));
console.log(Number.isFinite(+'30'));
console.log(Number.isFinite(+'30x'));

// Square function

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));

// Max
console.log(Math.max(1, 6, 12, 5, 7, 5));

// Min

console.log(Math.min(1, 6, 12, 5, 7, 5));

// Random 1-6
// trunc if for removing the decimal part.
console.log(Math.trunc(Math.random() * 6) + 1);

// function to generate random numbers between min and max range

const intRand = (min, max) => {
  return Math.floor(Math.random() * (max - min) + 1) + min;

  //0...1 =>0...(max-min) -> (min..max)
};
console.log(intRand(10, 1));

// Rounding integers , it's more like deleting the decimal part instead of round.

console.log(Math.trunc(23.543435));

// Round to the close integer 24
console.log(Math.round(23.888343));

// Ceil - round up

console.log(Math.ceil(25.888343));
console.log(Math.ceil(25.888343));

// Floor - round down

console.log(Math.floor(25.888343));
console.log(Math.floor(25.888343));

// floor and trunc wroks the same in positive numbers
// in negative trunc keeps reoving the decimal while floor rounds down

console.log(Math.trunc(-25.888343)); // -25
console.log(Math.floor(-25.888343)); // -26

// round decimals to string

console.log((2.3).toFixed(0)); // returns the string "2"
console.log((2.8).toFixed(0)); // returns the string "3"
console.log(+(2.3).toFixed(0)); // returns the number 2

// Remainder opration
// using remainder every second row in the movments will be painted in blue
// query selector returns node list so using spread to convert it into array
// need to give event handler cause this happens when we log and we still don't have movments.
// i call this function after finishing displaying user movments.

function paintEverySecondRow() {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) =>
    i % 2 === 0 ? (row.style.backgroundColor = 'orange') : row
  );
}

// Numeric seperators - help us to understand the number better , for js engine it's the same

const solarDiameter = 287_464_000_000;
console.log(solarDiameter);

const numberInCents = 345_99;

console.log(numberInCents);

// Big Int - in JS the representation of number is in 64 bits, which 53 bits are used for digits and the rest of the sign and the decimal point.
// so the biggest number js can represent is :

console.log(2 ** 53 - 1);
// which equals to
console.log(Number.MAX_SAFE_INTEGER); // numbers bigger then this will not have accurate representation

// so we can use BigInt

console.log(BigInt(432532532423435454678888888888866453434));
console.log(43253253242343545467888888888886645343n);

// operations

console.log(1000n + 1000n); // works fine 2000n

const huge = 254643646435345643634643n;
const num = 2;

//console.log(huge + num); // doesn't work can't add bigint with other types

console.log(20n > 15); // works , true
console.log(20n === 20); // false cause it's different types (BigInt , Number)

console.log(20n == 20); // true , js make type corresion

// it's allowed to concat bigInt with string, it's become string
console.log(10n + ' Bigint');

// Math operations doesn't work on bigIng
//console.log(Math.sqrt(16n));

// Dates and Times
// Create a date - 4 ways

const now = new Date();
console.log(now);

console.log(new Date('Aug 2 2022 16:45'));

console.log(account1.movementsDates[0]);

// can pass year , month , day , hour , minute , second
// months in js starts in 0
console.log(new Date(2022, 1, 10, 20, 45, 2));

// give the 1,1,1970

console.log(new Date(0));

// 3 days later 4,1,1970

console.log(new Date(3 * 24 * 60 * 60 * 1000));

// working with dates

const future = new Date(2022, 1, 10, 20, 45);
console.log(future);
console.log(future.getFullYear()); // 2022
console.log(future.getMonth()); // 1
console.log(future.getDate()); // the day - 10
console.log(future.getDay()); // the day in the week 4(Thursday
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // international date
console.log(future.getTime()); // returns how many miliseconds have passed since 1,1,1970
console.log(Date.now()); // current miliseconds now since 1,1,1970

// Calculating difference between 2 dates.

// will give a number result as the time in miliseconds
// so divide it by 24*60*60 *1000
const calcDayPassed2 = (date1, date2) =>
  Math.abs(date1 - date2) / (24 * 60 * 60 * 1000);

const dayPassed = calcDayPassed2(new Date(2022, 3, 1), new Date(2022, 3, 19));
console.log(dayPassed);

// Date API formattor

const options2 = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long', // could be long
  year: 'numeric',
  weekday: 'long',
};

const nowDate2 = new Date();

// will give the current computer local browser language
//  const localLanuage = navigator.language;
//console.log(localLanuage);

console.log(new Intl.DateTimeFormat('en-US', options2).format(nowDate2));
console.log(new Intl.DateTimeFormat('he-IL', options2).format(nowDate2));

// Number API formattor

const options3 = {
  style: 'unit', // could be currecny
  unit: 'mile-per-hour',
  currency: 'EUR',
};
const numFormat = 1000000000;

console.log(new Intl.NumberFormat('en-US', options3).format(numFormat));
console.log(new Intl.NumberFormat('ar-SY', options3).format(numFormat));
// Germany
console.log(new Intl.NumberFormat('de-DE', options3).format(numFormat));

// Set timeout - delay for x seconds , the code execution continues , doesn't stop here and wait till the call back function is finished.
// this function gets as first parameter a callback function and a second parameter to determine every x seconds to
// invoke the first argument(call back function)

setTimeout(() => console.log('Here is your pizza 🍕'), 3000);

// can add parameters to use in the call back function.

setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your pizza  with ${ing1} , and ${ing2}🍕`),
  3000,
  'Olives',
  'Mushrooms'
);

// A timer can be cancelled in the following manner :

const ingArr = ['Onions', 'Tomatoes'];
const pizzaTimer = setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your pizza  with ${ing1} , and ${ing2}🍕`),
  3000,
  ...ingArr
);

if (ingArr.includes('Onions')) clearTimeout(pizzaTimer);

// Set interval - call a call back  function every x seconds

// setInterval(() => {
//   const d = new Date();
//   console.log(`${d.getHours()} :  ${d.getMinutes()} : ${d.getSeconds()}`);
// }, 1000);
