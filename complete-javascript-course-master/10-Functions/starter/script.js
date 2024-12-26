'use strict';
// ///////////////////////////////////////
// // Functions Returning Functions
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');

// greet('Hello')('Jonas');

const greet = greeting => {
  return name => {
    console.log(`${greeting} ${name}`);
  };
};

greet('hey')('Juanma');

const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(23, 'Jonas Schmetman');
lufthansa.book(635, 'Jhon Smith');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 34, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 42, 'John Henry');
console.log(swiss);

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
book.apply(lufthansa, [453, 'Lissy Cooper']);

const bookEW = book.bind(eurowings);

bookEW(535, 'Steven Williams');

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//const addVAT = addTax.bind(null, 0.23);

const addVAT = rate => addTax(0.23, rate);

console.log(addVAT(100));
console.log(addVAT(34));
