'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelievery: function ({ starterIndex, mainIndex, time, address }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
    will be delivered to ${address} at ${time}`);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`your ingredients are ${ing1} , ${ing2} , ${ing3}`);
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//Destructuring Arrays//

const arr = [2, 3, 4];
const [a, b, c] = arr;
console.log(a);

let [first, , third] = restaurant.categories;
console.log(first, third);

// switching between the varaible's

[third, first] = [first, third];

console.log(first, third);

// recives 2 return values from a function
const [stater, main] = restaurant.order(2, 0);
console.log(stater, main);

//nested array Destructuring
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j); // 2 ,[5,6]

//nested array Destructuring inside destructring

const [x, , [y, z]] = nested; // 2,5,6
console.log(x, y, z);

// default values
const [g = 1, h = 1, f = 1] = [8, 9]; // 8,9,1

console.log(g, h, f);

// OBJECT DESTRUCTURING///
// in object destructuring we need to give the excat name's as in the object , and we dont need to skip like
// we did in the array if we want first and third element.

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// if we want a new names for the varaibles:

const {
  name: resturnatName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(resturnatName, hours, tags);

// default values in case they dont exist.
const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters);

//Mutating varaibles
let q = 111;
let e = 156;

const obj = { a: 23, b: 7, c: 66 };
({ a: q, b: e } = obj);
console.log(q, e);

//NESTED OBJECT DESTRUCTURING /////

const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

restaurant.orderDelievery({
  time: '22:30',
  address: 'Jerusalem',
  mainIndex: 2,
  starterIndex: 2,
});

// SPREAD OPREATOR ///
// unpacking all array elements.
const arr2 = [7, 8, 9];

const newArr = [1, 2, ...arr2]; // new address for this array.
console.log(newArr);
// print the array's values without array patteren.
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// copy array ///
const mainMenuCopy = [...restaurant.mainMenu];

// join 2 arrays //

const menuJoin = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuJoin);

// Iterables : arrays , strings, maps,sets but NOT objects.
const str = 'elad';
const letters = [...str, ' ', 'S.'];
console.log(letters);

// const ingredients = [
//   prompt("Let's make pasta! Ingredients1?"),
//   prompt(' Ingredients2?'),
//   prompt(' Ingredients3?'),
// ];

//console.log(ingredients);

//restaurant.orderPasta(...ingredients);

// Spread to object //
const newResturant = { foundedin: 1991, ...restaurant, founder: 'Elad' };
console.log(newResturant);

const resturatntCopy = { ...restaurant };
// name will be changed only in the copyResturant
resturatntCopy.name = "Elad's Resturants";
//the array will be changed in both copy and new resturant.
resturatntCopy.categories.push('GGGGGG');
console.log(resturatntCopy);

//REST ////

//SPREAD its after the equal sign, rest is before the equal sign.
// Rest opreator is to collect multiple varaibles and pack them into arr.
// Spread operator is to unpack an array into multiple varaibles.
// in expression we can use 1 rest only
const [v, n, ...others] = [1, 2, 3, 4, 54, 5, 6, 7, 7];
console.log(v, n, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays);

// Functions with REST /// exmaple of using both spread and rest
// first we take x2 arr and with spread we unpack the arr into varaibels,
//and when we get it in the add function we pack them into arr using rest.
const add = function (...numbers) {
  console.log(numbers);
};

add(2, 3);

add(5, 4, 7, 2);

const x2 = [5, 6, 7];
add(...x2);

restaurant.orderPizza('A', 'B', 'C', 'D');

// LOGICAL OPREATORS///
// can use any data type , return any data type , and short circuting.
// short circuting - if the first value been checked is true, JS wont check the next.
console.log(3 || 'ELAD'); // 3
console.log('' || 'ELAD'); // ELAD
console.log(true || 0); // true
console.log(undefined || null); // null

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// better way using short circuting.
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('_____AND__________');
// if the first value is false, stops.
console.log(0 && 'jonas'); // 0
console.log(7 && 'jonas'); // 'jonas' because evaluation continue and return the last variable that was on when evaluated

if (restaurant.orderPizza) {
  // if the function exsist we want to call it
  restaurant.orderPizza('mushrooms', 'olives');
}
// not good method to use && but works
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'olives');

// NULLISH OPERATOR ///

/// because resturant.numGuests = 0  and 0 its falsy , it will return 10 ,we want to fix it
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10;
console.log(guests3);

// only if resturant.numGuests is null or undefiend it will pick 10.
const guestCurrect = restaurant.numGuests ?? 10;
console.log(guestCurrect);

const rest1 = {
  name: 'Capri',
  numOfGuetsts: 0,
};

const rest2 = {
  name: 'Le Burger',
  owner: 'Elad V',
};

// if there is entitiy called numOfGuests we take it's value other wise it will be null(falsey value) and we will take 10
rest1.numOfGuetsts = rest1.numOfGuetsts || 10;
rest2.numOfGuetsts = rest2.numOfGuetsts || 10;

// shortcut : (like *= +=)

rest1.numOfGuetsts ||= 10;
rest2.numOfGuetsts ||= 10;

// with nullish opreator
rest1.numOfGuetsts ??= 10;
rest2.numOfGuetsts ??= 10;

// AND  - if the first it's true taking the next one .
//because rest2.owner exists it will move to Moshe and change it to Moshe.
rest2.owner = rest2.owner && 'Moshe';
// because owner isn't exists in rest1 so we get false value so we dont preceed to Moshe and for that we get undefind in owner.
rest1.owner = rest1.owner && 'Moshe';

// Shortcut
rest1.owner &= "'Moshe";
rest2.owner &= "'Moshe";

console.log(rest1);
console.log(rest2);

/// CODING CHALANGE ////

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',

  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);

// make an array of all events no duplicate

// first take the values (events) and make an array of them
const gameEventSet = [...gameEvents.values()];
// use set to delete duplicate and immediatly returns it into an array
const gameEventsNoDup = [...new Set(gameEventSet)];

console.log(gameEventsNoDup);

// delete yellow card in minute 64
gameEvents.delete(64);

// calculate the avg of an occurence of event.

console.log(
  `An event happend on average , every ${90 / gameEvents.size} minutes.`
);

// iterate on evenets and print them and also print if they were happend in first half or second.
for (const [key, value] of gameEvents) {
  let str = key > 45 ? 'SECOND HALF ' : 'FIRST HALF ';
  str += `${key}: ${value}`;
  console.log(str);
}

// retreving the goal keepers name from team1 and the rest of the players
const [gk, ...fieldPlayers] = game.players[0];
console.log(gk);
console.log(fieldPlayers);

// joining both team players to the same array
const allPlayers = [...game.players[0], ...game.players[1]];
console.log(allPlayers);

// adding 3 player to team1 players
const players1Final = [...game.players[0], 'Elad', 'Omer', 'Moyten'];
console.log(players1Final);

// taking out the odds for team1 ,team2 and draw
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1);
console.log(draw);
console.log(team2);

// function that prints the name of the players which scores and the num of goals
const printGoals = function (...playersScored) {
  for (let i of playersScored) {
    console.log(i + ' Num of goals ' + numOfGoals(i));
  }
};

const numOfGoals = function (playerName) {
  let cnt = 0;
  for (let i = 0; i < game.scored.length; i++) {
    if (game.scored[i] === playerName) {
      cnt++;
    }
  }
  return cnt;
};

printGoals('Lewandowski', 'Gnarby', 'Hummels');

console.log();

// printing which team has more chances to win based on the odds.
team1 < team2 && console.log('Team1 more likely to win');
team2 < team1 && console.log('Team2 more likely to win');

// itearte over game.scored and print each player with his goal and it's number of goal as the game proceeed
//because game.scored is array and iterable we can access it like this:
const scores = game.scored.entries();

for (let [index, player] of scores) {
  console.log(`Goal ${index + 1}: ${player}`);
}

//calculate the odd value avg

let avg = 0;
// because odds is object and it's not iterable we use Object.values
for (const odd of Object.values(game.odds)) {
  avg += odd;
}

avg /= Object.keys(game.odds).length;
console.log(avg);

for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} : ${odd} `);
}

// FOR OF LOOP /// like for each

const mennu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// 'of' takes all the element value , 'in' will take only the index
for (const item of mennu) {
  console.log(item);
}

// .entries give array with the index and the element
for (const item of mennu.entries()) {
  console.log(item);
}
// split it into 2 varaibels using spred.
// .entries give array with the index and the element
for (const [index, element] of mennu.entries()) {
  console.log(index);
  console.log(element);
}

/// OPTIONAL CHAINING /////
// only if restaurant.openingHours.mon is'nt undefiend(like nullish) , it will check for open other wise returns undefiend.
// to avoid errors.
console.log(restaurant.openingHours.mon?.open);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);
  // check if the open property exists in that day , if so print it other wise closed.
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`we open at ${open}`);
}

/// Optional Chaining In Methods :
// check if order function exists.
console.log(restaurant.order?.(0, 1) ?? 'Method Doesnt exists');

/// Optional Chaining In Array's :

const users = [{ name: 'Elad', email: 'elad@gmail.com' }];

console.log(users[0]?.name ?? 'User array empty');

// Looping over Objects

// this will return an array of the object keys
const properties = Object.keys(restaurant.openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days :`;

for (const day of Object.keys(restaurant.openingHours)) {
  openStr += `${day}, `;
}

console.log(openStr);

// now object values:

const values = Object.values(restaurant.openingHours);
console.log(values);

// now both of them entire object will return key and value as array.
// this will return an array of arrays , which each array has key(day name ) and value (open object)

const entries = Object.entries(restaurant.openingHours);
console.log(entries);

// itearting on the array so each element is array with size 2 key and value
for (const x of entries) {
  console.log(x);
}

//[key,value]
// itearting on the array so each element is array with size 2 key and value
// now using destruction to take the key value(name) and the value which is object so we destruct it too.
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//// SETS ///////
// sets elements are unique. this set will have 3 elemetns , all the duplicate are gone.
// sets are also iterable.
const orderSet = new Set(['Pasta', 'Pizza', 'Rissoto', 'Pizza', 'Pasta']);
console.log(orderSet);

// here in this set elad is not in arr so each chararcther will be in cell of it's own
console.log(new Set('elad'));

console.log(orderSet.size);
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));

orderSet.add('Garlic Bread');
orderSet.delete('Rissoto');
console.log(orderSet);
//orderSet.clear;

// they iterable so we can loop

for (const order of orderSet) {
  console.log(order);
}

// Example how to delete duplicates from array using sets
// transfer the array into set to avoid duplicate
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];

// return it into array without duplicate
const staffUnique = [...new Set(staff)];

console.log(staffUnique);

// another example using set to know how many different characther we have in string
console.log(new Set('Ellllaaaadddd').size);

////////// MAPS //////////////

// different between map to object - keys can have any type and in object is always strings

// set returns the updated map
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Italy');
rest.set(2, 'Spain');

// because set returns map we can concat the set opreations.
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest);

console.log(rest.get('name'));
console.log(rest.get(true));

// check if in this time we are open
const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);

rest.set([1, 2], 'Test');
console.log(rest);
console.log(rest.size);

// we will get here undefiend because we send another address even tough its the same arrays values.
// if we want it to work we need to make variable arr = [1,2] and use arr to set and get.
console.log(rest.get([1, 2]));

// we can insert to the map the DOM elements
rest.set(document.querySelector('h1'), 'Heading');

///// ITEARTION Maps ////////

const question = new Map([
  ['question', 'What is the best programming lanuage in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JS'],
  ['Currect', 3],
  [true, 'Currect !'],
  [false, 'Try again'],
]);

console.log(question);

// Convet Object to map
console.log(Object.entries(openingHours));
// because openingHours returns Array of arrays we can put in a map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key} : ${value}`);
  }
}

// const answer = Number(prompt('Your Answer'));

// console.log(question.get(question.get('Currect') === answer));

/// Convert map into array

console.log([...question]);

// extract the keys and values and change it to array
console.log([...question.keys()]);
console.log([...question.values()]);

/// STRINGSSSSSSSSSSSSSSSSSS //////////////
// strings are objects///

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(airline.length);
console.log('B365'.length);

/// Strings Methods - all methods return new Strings ////

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

console.log(airline.slice(4)); // Air Portugal
console.log(airline.slice(4, 7)); // Air

// taking the first word
console.log(airline.slice(0, airline.indexOf(' '))); // TAP

// taking the last word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Portugal

// start from the end
console.log(airline.slice(-2)); // al

// cut first and last character

console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('Middle seat');
  } else {
    console.log('Not middle seat');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// fix capitalization
const passenger = 'ElAd'; // Elad
const passengerLower = passenger.toLocaleLowerCase();
const passengerCorrect = passenger[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing Email
const email = 'hello@elad.io';
const loginEmail = '  Hello@Elad.Io \n';

const lowerEmail = loginEmail.toLowerCase();
// trim() remove leading white spaces and line terminator charcther (\n)
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

// we can do that in 1 step because string functions return new string.
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(email === normalizedEmail);

//replacing , replace function replace the first occurence.
const priceGB = '288,97£';

const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

// replace method replace only the first accurence, replace all replaces all the occourences
const announcement = 'All passengers go to door 23, this door is the departure';
console.log(announcement.replaceAll('door', 'gate'));

// we can still use replace function with regular expression
console.log(announcement.replace(/door/g, 'gate'));

//Booleans with strings
const plane2 = ' Airbus A320Air';
console.log(plane2.includes('A320'));
console.log(plane2.startsWith('Airb'));

if (plane2.startsWith('Airbus') && plane2.endsWith('Air')) {
}
console.log('Part of the new airbus familiy');

/// practice
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log("You aren't allowed on board");
  } else {
    console.log('Welcome to board');
  }
};

checkBaggage('I have some Food,laptop and a pocket Knife');

// split
// returns an array with splitted elements.
console.log('a+very+nice+string'.split('+'));

const [firstName, lastName] = 'Elad Weinbrand'.split(' ');
console.log(firstName);

//join
// join is the oppsite action from split - takes an array and divide each element and concat into string
const newGame = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newGame);

const capitalizeName = function (name) {
  // this function gets a string , and convert each capital first word letter into capital leter using split and join.
  const names = name.split(' ');
  const namesUpper = [];

  // going through the splitted array and make every lead Characther capital letter
  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1));
    // another way
    // namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  // return it into string
  console.log(namesUpper.join(' '));
};

capitalizeName('elad weinbrand');

// Padding string

const message = 'Go to gate 23';
// insert + at the start of the string untill it reaches length of 25 -- ++++++++++++Go to gate 23
console.log(message.padStart(25, '+'));
console.log(message.padStart(25, '+').padEnd(35, '+'));

const maskCreditCard = function (number) {
  // this function gets a credit card number and returns masked number with only 4 last digits can be seen.
  // like **************5632
  // convert number to string
  const str = number + '';
  // takes 4 last digits
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(3435464373456786));

// Repeat
const message2 = 'Bad weather all depratures delayed... ';
console.log(message2.repeat(3));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};
planesInLine(5);

/// EX
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

///THIS TEST DATA (pasted to textarea)
//underscore_case
//first_name
//Some_Variable
//calculate_AGE
//delayed_departure

//SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
//underscoreCase      ✅
//firstName           ✅✅
//someVariable        ✅✅✅
//calculateAge        ✅✅✅✅
//delayedDeparture    ✅✅✅✅✅

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const array = text.split('\n');
  const outputArray = [];

  for (const [ind, value] of array.entries()) {
    const [first, second] = value.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(17, ' ')}${'😊'.repeat(ind + 1)}`);
  }
});

const flights2 =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
const flightsArray = flights2.replaceAll('_', ' ').trim().split('+');

for (const flight of flightsArray) {
  const [time, from, to, hour] = flight.split(';');
  console.log(
    time.trim() +
      ' from ' +
      from.slice(0, 3).toUpperCase() +
      ' to ' +
      to.slice(0, 3).toUpperCase() +
      ' (' +
      hour.replace(':', 'h') +
      ')'
  );
}
