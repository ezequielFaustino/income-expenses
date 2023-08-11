const balanceDisplay = document.querySelector('[data-js="balance"]')
const moneyPlusDisplay = document.querySelector('[data-js="money-plus"]')
const moneyMinusDisplay = document.querySelector('[data-js="money-minus"]')
const form = document.querySelector('[data-js="form"]')
const transactionInput = document.querySelector('[data-js="text"]')
const amountInput = document.querySelector('[data-js="amount"]')
const transactionsUl = document.querySelector('[data-js="transactions-list"]')

const getLocalStorage = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage
  .getItem('transactions') !== null ? getLocalStorage : []

const removeTransaction = ID => {
  transactions = transactions.filter(({ id }) => id !== ID)
  updateLocalStorage()
  init()
}

const addTransactionIntoDom = ({ amount, name, id }) => {
  const CSSClass = amount < 0 ? 'minus' : 'plus'
  const operator = amount > 0 ? '' : '-'
  const amountWithoutOperator = Math.abs(amount)
  const li = document.createElement('li')
  li.dataset.id = `${id}`
  li.classList.add(CSSClass)
  li.classList.add('border-2')
  li.classList.add('border-b-indigo-500')

  const button = document.createElement('button')
  button.classList.add('delete-btn')
  button.dataset.trash = `${id}`
  button.innerHTML = `<i class="fa-solid fa-trash"></i>`
  li.appendChild(button)

  const span = document.createElement('span')
  span.textContent = `${name} | R$ ${operator}${amountWithoutOperator}`
  li.appendChild(span)

  const fragment = document.createDocumentFragment()
  fragment.appendChild(li)
  transactionsUl.append(fragment)
}

const addTransactionsArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount)
  })
}

const getTotal = transactionsAmounts => transactionsAmounts
  .reduce((accumulator, amount) => accumulator + amount, 0)
  .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
  .filter(value => value > 0)
  .reduce((accumulator, value) => accumulator + value, 0)
  .toFixed(2)

const getExpense = transactionsAmounts => Math.abs(transactionsAmounts
  .filter(value => value < 0)
  .reduce((accumulator, value) => accumulator + value, 0))
  .toFixed(2)

const updateBalanceValues = () => {
  const transactionsAmounts = transactions.map(({ amount }) => amount)

  const total = getTotal(transactionsAmounts)

  const income = getIncome(transactionsAmounts)

  const expense = getExpense(transactionsAmounts)

  balanceDisplay.textContent = `R$${total}`
  moneyMinusDisplay.textContent = `R$${expense}`
  moneyPlusDisplay.textContent = `R$${income}`
}

const removeTransactionToDom = event => {
  const trashWasClicked = event.target.dataset.trash
  const itemId = Number(trashWasClicked)
  if (trashWasClicked) {
    removeTransaction(itemId)
  }
}

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const init = () => {
  transactionsUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDom)
  updateBalanceValues()
}

const generateID = () => Math.round(Math.random() * 1000)

const cleanInputs = () => {
  transactionInput.value = ''
  amountInput.value = ''
}

const handleFormSubmit = event => {
  event.preventDefault()

  const transactionName = transactionInput.value.trim()
  const transactionAmount = amountInput.value.trim()
  const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

  if (isSomeInputEmpty) {
    alert('Por favor, preecha tanto a transação quanto o valor!')
    return
  }


  addTransactionsArray(transactionName, transactionAmount)
  updateLocalStorage()
  init()
  cleanInputs()
  transactionInput.focus()
}

init()
form.addEventListener('submit', handleFormSubmit)
transactionsUl.addEventListener('pointerdown', removeTransactionToDom)