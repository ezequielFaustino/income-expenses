import * as localStorage from './localStorage.js'

const balance = document.querySelector('[data-js="balance"]')
const moneyPlus = document.querySelector('[data-js="money-plus"]')
const moneyMinus = document.querySelector('[data-js="money-minus"]')

const form = document.querySelector('[data-js="form"]')
const addBtn = document.querySelector('[data-js="add-btn"]')

const dontRefreshPage = event => event.preventDefault()

const newList = localStorage.list
localStorage.setLocalStorage(newList)
const getLocalStorage = localStorage.getLocalStorage()


const addTransactionIntoDom = (transaction) => {
  const li = document.createElement('li')
  // addTransactionIntoList(transaction)
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
  const operator = transaction.amount > 0 ? '' : '-'
  const amountWithoutOperator = Math.abs(transaction.amount)
  li.classList.add(CSSClass)
  li.classList.add('border-b-2')
  li.classList.add('border-sky-400')

  li.innerHTML = `${transaction.name}: R$ ${operator}${amountWithoutOperator}`

  const fragment = document.createDocumentFragment()
  const transactionsUl = document.querySelector('[data-js="transactions-list"]')

  fragment.append(li)
  transactionsUl.append(fragment)

}

const updateBalanceValues = () => {
  const transactionsAmounts = getLocalStorage.map(({amount}) => amount)
  const total = transactionsAmounts
    .reduce((accumulator, amount) => accumulator + amount, 0).toFixed(2)
  balance.innerText = `R$${total}`
  
  const income = transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, amount) => accumulator + amount, 0)
  moneyPlus.innerText = `R$ ${income.toFixed(2)}`
  
  const expense = transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, amount) => accumulator + amount, 0)
  moneyMinus.innerText = `R$ ${expense.toFixed(2)}`
}

const addTransactionIntoList = (transaction) => {
  const transactionName = document.querySelector('[data-js="text"]').value
  const amountValue = document.querySelector('[data-js="amount"]').value

  const name = transaction.name = transactionName
  const amount = transaction.amount = amountValue
  const newObj = [{ name, amount }]

  return newObj
}

const init = () => {
  getLocalStorage.forEach(addTransactionIntoDom)
  updateBalanceValues()
}

init()

const clickEvent = (e) => {
  addBtn.onpointerenter = addBtn
  addBtn.setPointerCapture(e.pointerId)

}

form.addEventListener('submit', dontRefreshPage)
addBtn.onpointerdown = clickEvent
