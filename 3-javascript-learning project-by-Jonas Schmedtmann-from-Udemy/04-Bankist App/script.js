"use strict";

//////////////////////////////////
// Data

const account1 = {
  owner: "Wasit Manjit",
  movements: [400, 300, -300, 3000, -600, -100, 50, 1600],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Matha Youth",
  movements: [600, 3000, -400, -600, 500, -40, -200, -100],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Madara Ujiha",
  movements: [200, -200, 350, -300, -20, -50, 400, -350],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Aren Yager",
  movements: [600, 400, 9000, 120, 50, 650, 700, 900],
  interestRate: 1,
  pin: 4444,
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movement_row">
    <div class="movement_type movement--${type}">${i + 1} ${type}</div>
    
    <div class="movement_value">${mov}฿</div>
  </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}฿`;
};

const calcDisplaysummary = function (acc) {
  // income
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSomeIn.textContent = `${income}฿`;
  // outcome
  const outcome = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSomeOut.textContent = `${outcome}฿`;
  // interest
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int > 1;
    })
    .reduce((acc, int) => acc + int);
  labelSomeInterest.textContent = `${Math.trunc(interest)}฿`;
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
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaysummary(acc);
};

//////////////////////////////////
// Event handlers

let currentAccount;
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
    // display UI
    containerApp.style.opacity = 1;
    updateUI(currentAccount);

    // clear fields
    inputLoginUsername.value = inputLoginPassword.value = "";
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
    currentAccount.balance &&
    receiveAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiveAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

// request loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov > amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
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
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
