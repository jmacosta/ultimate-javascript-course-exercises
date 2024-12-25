'use strict';
function calcAge(birthYear) {
  const age = 2024 - birthYear;
  function printAge() {
    const output = `${firstName}, you are ${age} born in ${birthYear}`;
    console.log(output);
    if (birthYear >= 1991 && birthYear <= 1996) {
      const str = `Oh, and you're a millenial ${firstName}`;
      console.log(str);
    }
  }
  printAge();
  return age;
}

const firstName = 'Jonas';
//calcAge(1991);

console.log(me);
console.log(job);
console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;
