'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Users functions

const createUserNames = accs =>
  accs.forEach(
    acc =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name[0])
        .join(''))
  );
createUserNames(accounts);
// reset data

const resetInputs = () => {
  inputLoginPin.value = '';
  inputLoginUsername.value = '';
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  inputLoanAmount.value = '';
  inputCloseUsername.value = '';
  inputClosePin.value = '';
  inputLoginPin.blur();
  inputTransferTo.blur();
  inputTransferAmount.blur();
  inputLoanAmount.blur();
  inputCloseUsername.blur();
  inputClosePin.blur();
};
const logout = () => {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = `Log in to get started`;
};

const transferMoney = (oriAccount, destAccount, amount) => {
  oriAccount.movements.push(-amount);
  destAccount.movements.push(amount);
  displayData(oriAccount);
};

//Display Data functions

const calcPrintBalance = movements => {
  labelBalance.textContent = `${movements.reduce((acc, mov) => acc + mov, 0)}€`;
};

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((move, i) => {
    const typeMovement = move > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${typeMovement}">${
      i + 1
    } ${typeMovement}</div>
        
        <div class="movements__value">${move}</div>
      </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplaySummary = (movements, interestRate) => {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
const updateBalance = account => {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
};

const displayData = account => {
  resetInputs();
  const { owner, movements, interestRate } = account;
  labelWelcome.textContent = `Welcome back, ${owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;
  displayMovements(movements);
  calcPrintBalance(movements);
  updateBalance(account);
  calcDisplaySummary(movements, interestRate);
};

// sort functions

//event handler
let currentAccount;
let destTransfer;
let sorted = false;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    displayData(currentAccount);
  }
});
btnSort.addEventListener('click', e => {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount.movements, sorted);
});
btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  destTransfer = accounts.find(acc => acc.username === inputTransferTo.value);

  if (
    destTransfer?.username &&
    Number(inputTransferAmount.value) > 0 &&
    Number(currentAccount.balance) >= Number(inputTransferAmount.value) &&
    destTransfer?.username !== currentAccount.username
  )
    transferMoney(
      currentAccount,
      destTransfer,
      Number(inputTransferAmount.value)
    );
  else alert(`⛔ Transfer invalid`);
  resetInputs();
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const accToRemove = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(accToRemove, 1);
    logout();
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10))
    currentAccount.movements.push(amount);
  resetInputs();
  displayData(currentAccount);
});

const groupedAcccounts = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedAcccounts);

//.1
const bankDepositSum = accounts
  .flatMap(account => account.movements)
  .filter(mov => mov >= 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(bankDepositSum);

//.2

// const bankDeposits1000 = accounts
//   .flatMap(account => account.movements)
//   .filter(mov => mov >= 1000).length;

const bankDeposits1000 = accounts
  .flatMap(account => account.movements)
  .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0);

console.log(bankDeposits1000);

//.3
// const sums = accounts
//   .flatMap(account => account.movements)
//   .reduce(
//     (sums, mov) => {
//       mov > 0 ? (sums.deposits += mov) : (sums.withdrawals += mov);
//       return sums;
//     },
//     {
//       deposits: 0,
//       withdrawals: 0,
//     }
//   );

const sums = accounts
  .flatMap(account => account.movements)
  .reduce(
    (sums, mov) => {
      sums[mov > 0 ? 'deposits' : 'withdrawals'] += mov;
      return sums;
    },
    {
      deposits: 0,
      withdrawals: 0,
    }
  );
console.log(sums);

// 4.

// this is a nice title --> This Is a Nice Title

const convertTitleCase = title => {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  return title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word)
        ? word
        : `${word[0].toUpperCase()}${word.slice(1)}`
    )
    .join(' ');
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
