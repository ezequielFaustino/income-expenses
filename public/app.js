const balanceDisplay = document.querySelector('[data-js="balance"]')
const moneyPlusDisplay = document.querySelector('[data-js="money-plus"]')
const moneyMinusDisplay = document.querySelector('[data-js="money-minus"]')
const form = document.querySelector('[data-js="form"]')
const transactionInput = document.querySelector('[data-js="text"]')
const amountInput = document.querySelector('[data-js="amount"]')
const transactionsUl = document.querySelector('[data-js="transactions-list"]')
const addBtn = document.querySelector('[data-js="add-btn"]')

let transactions = []

/*
const addTransactionIntoDom = ({amount, name, id}) => {
  const li = document.createElement('li')
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
  const operator = transaction.amount > 0 ? '' : '-'
  const amountWithoutOperator = Math.abs(transaction.amount)
  li.classList.add(CSSClass)
  li.classList.add('border-b-2')
  li.classList.add('border-sky-400')

  li.innerHTML = `${transaction.name}: R$ ${operator}${amountWithoutOperator}`

  const fragment = document.createDocumentFragment()
  fragment.append(li)
  transactionsUl.append(fragment)
}
*/

/*
const updateBalanceValues = () => {
  const getLocalStorage = localStorage.getLocalStorage()

  const transactionsAmounts = getLocalStorage.map( ({amount}) => amount)
  console.log(transactionsAmounts)
  const total = transactionsAmounts
    .reduce((accumulator, amount) => accumulator + amount, 0)


  const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)

  const expense = transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)

  balanceDisplay.textContent = `R$${total}`
  moneyMinusDisplay.textContent = `R$ ${expense}`
  moneyPlusDisplay.textContent = `R$ ${income}`
}
*/
const init = () => {

}

const generateID = () => Math.round(Math.random() * 1000)

const addTransactionsArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount)
  })

  console.log(transactions)
}

const handleFormSubmit = event => {
  event.preventDefault()
  
  const transactionName = transactionInput.value.trim()
  const transactionAmount = amountInput.value.trim()
  
  addTransactionsArray(transactionName, transactionAmount)
}

form.addEventListener('submit', handleFormSubmit)
