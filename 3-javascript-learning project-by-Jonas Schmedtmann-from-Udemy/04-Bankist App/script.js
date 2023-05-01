"use strict";

//////////////////////////////////
// Data

const account1 = {
  owner: "Wasit Manjit",
  movements: [400, 300, -300, 3000, -600, -100, 50, 1600],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-04-20T17:01:17.194Z",
    "2023-04-22T23:36:17.929Z",
    "2023-04-28T10:51:36.790Z",
  ],
  currency: "THB",
  locale: "th-TH",
};

const account2 = {
  owner: "Matha Youth",
  movements: [600, 3000, -400, -600, 500, -40, -200, -100],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-04-20T17:01:17.194Z",
    "2023-04-22T23:36:17.929Z",
    "2023-04-28T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account3 = {
  owner: "Madara Ujiha",
  movements: [200, -200, 350, -300, -20, -50, 400, -350],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-04-20T17:01:17.194Z",
    "2023-04-22T23:36:17.929Z",
    "2023-04-28T10:51:36.790Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: "Aren Yager",
  movements: [600, 400, 9000, 120, 50, 650, 700, 900],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2023-04-20T17:01:17.194Z",
    "2023-04-22T23:36:17.929Z",
    "2023-04-28T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "en-DE",
};

const accounts = [account1, account2, account3, account4];

//////////////////////////////////
// Elements

// label
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance_value");
const labelSomeIn = document.querySelector(".summary_value--in");
const labelSomeOut = document.querySelector(".summary_value--out");
const labelSomeInterest = document.querySelector(".summary_value--interest");
const labelTime = document.querySelector(".timer");
// Container
const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
// btn
const btnLogin = document.querySelector(".login_btn");
const btnTransfer = document.querySelector(".form_btn--transfer");
const btnLoan = document.querySelector(".form_btn--loan");
const btnClose = document.querySelector(".form_btn--close");
const btnSort = document.querySelector(".btn_sort");
// Input form
const inputLoginUsername = document.querySelector(".login_input--user");
const inputLoginPassword = document.querySelector(".login_input--password");
const inputTransferTo = document.querySelector(".form_input--to");
const inputTransferAmount = document.querySelector(".form_input--amount");
const inputLoanAmount = document.querySelector(".form_input--loan-amount");
const inputCloseUsername = document.querySelector(".form_input--user");
const inputClosePassword = document.querySelector(".form_input--password");

//////////////////////////////////
// Elements

const formatMovementDate = function (date, locale) {
  const calcDaypassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));
  const daypassed = calcDaypassed(new Date(), date);
  console.log(daypassed);

  if (daypassed === 0) return "Today";
  if (daypassed === 1) return "Yesterday";
  if (daypassed <= 7) return `${daypassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formatMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
    <div class="movement_row">
    <div class="movement_type movement--${type}">${i + 1} ${type}</div>
    <div class="movement_date">${displayDate} </div>
    
    
    <div class="movement_value">${formatMov}</div>
  </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaysummary = function (acc) {
  // income
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSomeIn.textContent = formatCur(income, acc.locale, acc.currency);
  // outcome
  const outcome = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSomeOut.textContent = formatCur(
    Math.abs(outcome),
    acc.locale,
    acc.currency
  );
  // interest
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int > 1;
    })
    .reduce((acc, int) => acc + int);
  labelSomeInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsername = function (accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};
createUsername(accounts);

const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaysummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = `${Math.floor(time / 60)}`.padStart("2", "0");
    const sec = `${time % 60}`.padStart("2", "0");

    // print remaining time to UI
    labelTime.textContent = `${min}:${sec}`;

    // logout when time ===0
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get start`;
    }
    // Decrase time
    time = time - 1;
  };
  // Set time
  let time = 600;

  // call tick
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//////////////////////////////////
// Event handlers
let currentAccount;
let timer;

// fake login
currentAccount = account1;
containerApp.style.opacity = 1;
updateUI(currentAccount);
// login
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPassword.value)) {
    // Display welcome message
    console.log(`yes`);
    labelWelcome.textContent = `Greeting, ${
      currentAccount.owner.split(" ")[0]
    }`;
    // updatte date
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };
    const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // display UI
    containerApp.style.opacity = 1;
    updateUI(currentAccount);

    // clear fields
    inputLoginUsername.value = inputLoginPassword.value = "";

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();
  } else {
    alert(`Please check your username or password again!`);
  }
});

// transfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiveAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  // clear fields
  inputTransferTo.value = inputTransferAmount.value = "";

  if (
    amount > 0 &&
    receiveAcc &&
    currentAccount.balance >= amount &&
    receiveAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiveAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // reset Timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

// request loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov > amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount);

    // reet timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
  inputLoanAmount.value = "";
});

// close acc
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount?.pin === Number(inputClosePassword.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete acc
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePassword.value = "";
});

// Sort
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
