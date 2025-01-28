Math.trunc(Math.random() * 6);

console.log(Math.trunc(Math.random() * 6) + 1);
console.log(Math.trunc(Math.random() * 6) + 1);
console.log(Math.trunc(Math.random() * 6) + 1);
console.log(Math.trunc(Math.random() * 6) + 1);
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));
console.log(randomInt(2, 6));

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2));

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2);
console.log(Math.trunc(Math.random() * 6) + 1);

// reminder operator
console.log(5 % 2);
console.log(5 / 2);

const isEven = n => n % 2 === 0;

console.log(isEven(8));
console.log(isEven(3));
console.log(isEven(5));
console.log(isEven(23425252532443));

const diameter = 287_460_000_000;
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

// create a date

const today = new Date();
console.log(today);

console.log(new Date('2025-01-26T20:24:15.000Z'));
console.log(new Date('december 24, 2015'));

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
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
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
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 33, 14, 23, 5));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

//working with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());

console.log(future.getTime());

console.log(new Date(2142253380000));
console.log(Date.now());

future.setFullYear(2040);

console.log(future);

console.log(Number(future));

const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));

calcDaysPassed(new Date(2037, 10, 24), new Date(2037, 10, 19));

console.log(calcDaysPassed(new Date(2037, 10, 24), new Date(2037, 10, 18)));

setTimeout(() => console.log('Here is your pizza 🍕'), 3000);
console.log('waiting...');

setInterval(() => {
  console.log(new Date());
}, 1000);
