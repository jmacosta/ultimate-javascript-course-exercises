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

  static hey() {
    console.log('Hey there 👋');
    console.log(this);
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

PersonCl.hey();

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
// };

// const steven = Object.create(PersonProto);
// steven.name = 'Steven';
// steven.birthYear = 2002;
// console.log(steven.calcAge());
// console.log(steven);

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I Study ${this.course}`);
};
const mike = new Student('Mike', 2020, 'Computer science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(Student.prototype.constructor);

class StudentCl extends PersonCl {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.firstName} and I Study ${this.course}`);
  }
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old but as a student i feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

//////////////////////////////
// Inheritance Between "Classes" : Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I Study ${this.course}`);
};

const jay = Object.create(StudentProto);
PersonProto.hey = function () {
  console.log(`Hey ${this.firstName} how are you?`);
};
jay.init('Jay', 2010, 'Computer Science');
steven.firstName = 'Steven';
steven.birthYear = 2020;

console.log(steven);
jay.introduce();
jay.calcAge();
jay.hey();

class Account {
  constructor(owner, currency, pin, movements) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movements = movements;
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  deposit(mov) {
    this.movements.push(mov);
  }
  withdrawal(mov) {
    this.deposit(-mov);
  }
  approveLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Jonas', 'Eur', 1111, []);
acc1.deposit(250);
acc1.withdrawal(140);
console.log(acc1);
acc1.requestLoan(1000);
acc1.approveLoan(1000);
