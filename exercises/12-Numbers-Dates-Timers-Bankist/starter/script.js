'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
//   type: 'premium',
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
//   type: 'standard',
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
//   type: 'premium',
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
//   type: 'basic',
// };

// const accounts = [account1, account2, account3, account4];

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
    '2025-01-24T18:49:59.371Z',
    '2025-01-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

const formatMoney = (value, locale, currency) => {
  const options = {
    style: 'currency',
    currency,
  };

  return Intl.NumberFormat(locale, options).format(value);
};

const formatDate = (date, balanceDate = false) => {
  const now = new Date();
  const optionsBalance = {
    day: 'numeric',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const optionsMovements = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  // const locale = navigator.language;

  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const friendlyDates = date => {
    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    return new Intl.DateTimeFormat(
      currentAccount.locale,
      optionsMovements
    ).format(date);
  };

  return balanceDate
    ? new Intl.DateTimeFormat(currentAccount.locale, optionsBalance).format(
        date
      )
    : friendlyDates(date);
};

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
  clearInterval(timer);
  timer = startLogOutTimer();
};
const logout = () => {
  containerApp.style.opacity = 0;
  labelWelcome.textContent = `Log in to get started`;
};

const transferMoney = (oriAccount, destAccount, amount) => {
  oriAccount.movements.push(-amount);
  oriAccount.movementsDates.push(new Date().toISOString());
  destAccount.movements.push(amount);
  destAccount.movementsDates.push(new Date().toISOString());
  displayData(oriAccount);
};

//Display Data functions

const calcPrintBalance = movements => {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  return (labelBalance.textContent = formatMoney(
    balance,
    currentAccount.locale,
    currentAccount.currency
  ));
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const combinedMovsDates = account.movements.map((mov, i) => {
    return { movement: mov, movementDate: account.movementsDates.at(i) };
  });
  console.log(combinedMovsDates);

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach((object, i) => {
    const { movement, movementDate } = object;
    const typeMovement = movement > 0 ? 'deposit' : 'withdrawal';
    const displayDate = formatDate(new Date(movementDate));
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${typeMovement}">${
      i + 1
    } ${typeMovement}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatMoney(
          movement,
          account.locale,
          account.currency
        )}</div>
      </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplaySummary = (movements, interestRate) => {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatMoney(
    incomes,
    currentAccount.locale,
    currentAccount.currency
  );
  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatMoney(
    Math.abs(out),
    currentAccount.locale,
    currentAccount.currency
  );
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatMoney(
    interest,
    currentAccount.locale,
    currentAccount.currency
  );
};
const updateBalance = account => {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
};

const displayData = account => {
  resetInputs();
  const { owner, movements, interestRate } = account;
  labelWelcome.textContent = `Welcome back, ${owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;
  displayMovements(account);
  calcPrintBalance(movements);
  updateBalance(account);
  calcDisplaySummary(movements, interestRate);
};

// sort functions

const startLogOutTimer = () => {
  let timeOut = 5 * 60;
  const tick = () => {
    const min = String(Math.trunc(timeOut / 60)).padStart(2, 0);
    const sec = String(timeOut % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (timeOut === 0) {
      clearInterval(timer);
      logout();
    }
    timeOut--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//event handler
let currentAccount,
  destTransfer,
  sorted = false,
  timer;

//////////

//labelDate.textContent = now.toLocaleDateString();

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    displayData(currentAccount);
  }
  labelDate.textContent = formatDate(new Date(), true);
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
});
btnSort.addEventListener('click', e => {
  e.preventDefault();
  sorted = !sorted;
  displayMovements(currentAccount, sorted);
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

const loan = amount => {
  currentAccount.movements.push(amount);
  currentAccount.movementsDates.push(new Date().toISOString());
  displayData(currentAccount);
};

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10))
    setTimeout(loan, 3000, amount);
  resetInputs();
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
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with', 'and'];
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  return capitalize(
    title
      .toLowerCase()
      .split(' ')
      .map(word => (exceptions.includes(word) ? word : capitalize(word)))
      .join(' ')
  );
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
// labelBalance.addEventListener('click', () => {
//   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//     if (i % 2 === 0) {
//       return (row.style.backgroundColor = 'oranged');
//     }
//   });
// });

labelBalance.addEventListener('click', () => {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'orangered';
    }
    if (i % 3 === 0) {
      row.style.backgroundColor = 'blue';
    }
  });
});
