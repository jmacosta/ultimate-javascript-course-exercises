'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////////////////
//Page Navigation

// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component

tabContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.operations__tab');
  //Guard clause
  if (!clicked) return;
  // active tab
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  clicked.classList.add('operations__tab--active');

  // active content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation

const handlerHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handlerHover.bind(0.5));
nav.addEventListener('mouseout', handlerHover.bind(1));

// sticky navigation
const initialcoords = section1.getBoundingClientRect();
console.log(initialcoords);
window.addEventListener('scroll', function (e) {
  if (this.window.scrollY > initialcoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// console.log(document.querySelector('.header'));
// console.log(document.querySelectorAll('.section'));

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

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

// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// // console.log(message.style.backgroundColor);

// // console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// //document.documentElement.style.setProperty('--color-primary', 'orangered');

// //Atributes

// // const logo = document.querySelector('.nav__logo');
// // logo.alt = ' Beautiful minimalist logo';
// // console.log(logo.alt);
// // console.log(logo.src);
// // console.log(logo.className);

// // console.log(logo.getAttribute('src'));

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// console.log(logo.dataset.versionNumber);

// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// const alertH1 = e => {
//   alert('addEventListener: Great! you are reading the header :D');
// };
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', alertH1);
// h1.removeEventListener('mouseenter', alertH1);

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// });
// document.querySelector('nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   // console.log('NAV', e.target, e.currentTarget);
// });

// // console.log(randomColor());

// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// //Going upwards: Parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// //Going sideways: sibling
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) el.style.transform = 'scale(0.5';
// });
