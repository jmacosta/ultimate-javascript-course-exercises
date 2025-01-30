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

btnsOpenModal.forEach(btnOpenModal =>
  btnOpenModal.addEventListener('click', openModal)
);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
console.log(document.querySelector('.header'));
console.log(document.querySelectorAll('.section'));

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

document.getElementsByClassName('btn');

// creating and inserting elements
//.insertAdjacentHTML()

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent= 'We use cookies for improved functionality and analytics '
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class = "btn btn--close-cookie">Got it!</button>';
const header = document.querySelector('.header');
header.prepend(message);
//header.append(message.cloneNode(message));
header.append(message);
// header.before(message);
// header.after(message);

// delete Element

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});
