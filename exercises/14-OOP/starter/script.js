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
