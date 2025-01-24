'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// //slice
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// // splice

// //console.log(arr.splice(2));
// arr.splice(-1);
// arr.splice(1, 2);
// console.log(arr);

// //reverse
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);
// //concat
// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// //join

// console.log(letters.join(' - '));

// at method
// const arr = [23, 11, 64];
// console.log(arr[0]);

// console.log(arr.at(-1));
// console.log(arr.at(-2));

// // foreach method

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach((move, i) =>
//   move > 0
//     ? console.log(`Movement ${i + 1}: you deposited ${move} `)
//     : console.log(`Movement ${i + 1}: you withdrew ${Math.abs(move)} `)
// );

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
const dollarsMovements = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(dollarsMovements);

const MovementsDescriptions = movements.map(
  (move, i) =>
    `Movement ${i + 1}: you ${move > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      move
    )}`
);

console.log(MovementsDescriptions);

const deposits = movements.filter(move => move > 0);
console.log(deposits);

const withdrawals = movements.filter(move => move < 0);
console.log(withdrawals);

console.log(movements);
const currentBalance = movements.reduce((acc, move) => acc + move, 0);
console.log(currentBalance);

// maximum value

const maximum = movements.reduce(
  (max, mov) => (max > mov ? max : mov),
  movements[0]
);

console.log(maximum);

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements.find(mov => mov < 0));

///////////////////////////////////////////////////////////////
// The New findLast and findLastIndex Methods

console.log(movements);
const lastWitdhrawal = movements.findLast(mov => mov < 0);
console.log(lastWitdhrawal);

console.log(
  `Your latest large movement was ${
    movements.length -
    movements.findLastIndex(
      mov => mov === movements.reduce((acc, mov) => (acc > mov ? acc : mov), 0)
    )
  } movements ago `
);

console.log(movements.includes(-130));
console.log(movements.some(mov => mov > 0));
console.log(movements.every(mov => mov > 0));

const arr = [1, 2, 3, [4, 5, 6], 7, 8];
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arr.flat());
console.log(arrDeep.flat());

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

console.log(
  accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0)
);

//flatmap
console.log(
  accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)
);

// sorting Arrays

// strings
const owners = ['jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

//numbers
console.log(movements);
console.log(movements.sort());
console.log(movements.sort((a, b) => a - b));

/////////////////////////////////////////////////////////////////////////////////////////////
// Array grouping

console.log(movements);

const groupMovements = Object.groupBy(movements, mov =>
  mov > 0 ? 'deposit' : 'withdrawal'
);
console.log(groupMovements);

////////////////////////////////////////////////////////////////////
//// Non destructive methods

console.log(movements);
//movements.reverse()
//movements.toReversed()
console.log(movements.toReversed());
console.log(movements);
