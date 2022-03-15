'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/// DOM

console.log(document.documentElement); // the whole tree
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section'); // returns nodes list
console.log(allSections);

document.getElementById('#section--1');
const allButtons = document.getElementsByTagName('button'); // returns html collector
console.log(allButtons);

// The difference between html collection to node lists is that if u delete any element of the collection in run time
// it will automatically update, and in node lists it won't update

console.log(document.getElementsByClassName('btn')); // returns also colletcion

// Creatig and inserting elements
// .insertAdjacentHTMl

// Creating DOM object that we can do something on it , but it's not in the DOM itself.
const message = document.createElement('div');
// add classes
message.classList.add('cookie-message');
// add text to the element , we can use both of this properties to read and to set contenct
// add text
message.textContent = 'WE use coockies to improve functionality';
// add html
message.innerHTML =
  'We use coockies to improve functionality <button class = "btn btn--close-cookie">Got it</button>';

// insert it into the DOM
// prepend insert as the first child of the element (in this case the header)
//header.prepend(message);
// we can insert it as the last child - append
header.append(message);
// this message element will be inserted once.
// if we still want to insert same element more then once , we will clone it.
//header.append(message.cloneNode(true));

// before and after

//header.before(message);
//header.after(message);

// Delete elemetns

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
