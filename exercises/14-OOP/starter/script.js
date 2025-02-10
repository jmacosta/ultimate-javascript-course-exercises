'use strict';
const Person = function (firstName, birthYear) {
  //Instances properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  //   this.calcAge = function () {
  //     console.log(new Date.now() - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1.- New empty{} is created
// 2.- function is called, this ={}
// 3.- {} linked to prototype
//5.- function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);
console.log();

// Prototypes

Person.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);
console.dir(Person.prototype.constructor);

const arr = [3, 4, 6, 2, 8, 3, 2];
console.log(arr.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');

//class expression
// const PersonCl = class{}
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);

//1. Classes are NOT Hoisted
//2. Classes are first-class Citizens
//3. Classes are executed in strict mode

const account = {
  owner: 'jonas',
  movements: [200, 539, 345, 234, 453],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);
account.latest = 326;
console.log(account.latest);
