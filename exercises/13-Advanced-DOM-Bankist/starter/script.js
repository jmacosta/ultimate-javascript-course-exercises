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

// Styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

//document.documentElement.style.setProperty('--color-primary', 'orangered');

//Atributes

const logo = document.querySelector('.nav__logo');
logo.alt = ' Beautiful minimalist logo';
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));

console.log(logo.dataset.versionNumber);

logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

const alertH1 = e => {
  alert('addEventListener: Great! you are reading the header :D');
};
const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1);
h1.removeEventListener('mouseenter', alertH1);
