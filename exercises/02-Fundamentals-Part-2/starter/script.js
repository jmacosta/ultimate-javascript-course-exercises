'use strict';
// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;

const jonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  birthYear: 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
  hasDrivingLicense: true,
  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },
};

console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]} `
);
// Jonas is a 46-year old teacher, and he has a driver`s License
console.log(
  `${jonas.firstName} is a ${
    jonas.age ? jonas.age : jonas.calcAge()
  }-year old ${jonas.job} and he has ${
    jonas.hasDrivingLicense ? 'a' : 'no'
  } driver's License `
);
