'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Bruce IRAKOZE',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],

};

const account2 = {
  owner: 'Micha Ciella',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],

};

const account3 = {
  owner: 'Guest ',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],

};



const accounts = [account1, account2, account3];



// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');



const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES





const createUser = function () {

  accounts.forEach(acc => {
    let userName = acc.owner.split(' ').map(name => name.slice(' ')[0]).join('').toLocaleLowerCase()

    let pin = acc.owner.split(' ').map(name => name.slice(' ')[0]).join('')
      .toLocaleLowerCase() + 11


    acc.user = userName

    acc.psw = pin


  })

}

createUser(accounts)

///////////////////////////////////////////////

const renderMovement = function (movs) {

  containerMovements.textContent = ''

  movs.forEach((mvt, i) => {
    let type = mvt > 0 ? 'deposit' : 'withdrawal'
    let html = `

    <div class="movements__row">
     <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
     <div class="movements__date">3 days ago</div>
     <div class="movements__value">${mvt}€</div>
    </div>

   `

    containerMovements.insertAdjacentHTML('afterbegin', html)
  })


}

const incomes = function (acc) {
  let a = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${a}€`;
}



const out = function (acc) {
  let b = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(b)}€`;
}


const calcBalance = function (acc) {
  let balances = acc.movements.reduce((acc, curr) => acc + curr, 0)
  acc.balance = balances

  labelBalance.textContent = balances

}


const updateUI = function (acc) {

  renderMovement(acc.movements)
  incomes(acc)
  out(acc)
  calcBalance(acc)
}


let currentAccount

btnLogin.addEventListener('click', function (e) {
  e.preventDefault()


  currentAccount = accounts.find(acc => acc.user === inputLoginUsername.value)

  if (currentAccount?.psw === inputLoginPin.value) {

    labelWelcome.innerHTML = `Welcome again, ${currentAccount.owner.split(' ')[0]}`

    containerApp.style.opacity = 10
    inputLoginPin.value = inputLoginUsername.value = ''


    updateUI(currentAccount)

  }

})


btnTransfer.addEventListener('click', function (e) {

  e.preventDefault()


  let amount = +inputTransferAmount.value


  let receiver = accounts.find(acc => acc.user === inputTransferTo.value)



  if (amount > 0 &&
    receiver &&
    currentAccount.balance >= amount &&
    receiver?.username !== currentAccount.user) {

    currentAccount.movements.push(-amount)
    receiver.movements.push(amount)

    updateUI(currentAccount)
  }

  inputTransferAmount.value = inputTransferTo.value = ''


})


btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});










