const balance = document.querySelector('[data-js="balance"]')
const moneyPlus = document.querySelector('[data-js="money-plus"]')
const moneyMinus = document.querySelector('[data-js="money-minus"]')

const form = document.querySelector('[data-js="form"]')
const addBtn = document.querySelector('[data-js="add-btn"]')

const transactionsList = [{}]

const dontRefreshPage = event => event.preventDefault()

const addTransactionIntoDom = (transaction) => {
  const li = document.createElement('li')
  addTransactionIntoList(transaction)
  
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

  const total = sumBalanceValues()
  balance.innerText = `R$${total}.00`
}

console.log(transactionsList)

const getBalanceValues = () => {
  const getAmount = transactionsList.map(({ amount }) => amount)
  return getAmount
}

const sumBalanceValues = () => {
  const getAmount = getBalanceValues()
  const sum = getAmount.reduce((accumulator, amount) => accumulator + amount, 0,)

  return sum
}

const incomesAndExpenses = () => {
  const getAmount = getBalanceValues()

  const incomes = getAmount.filter((amount) => amount > 0)
    .reduce((accumulator, amount) => accumulator + amount, 0)

  const expenses = getAmount.filter((amount) => amount < 0)
    .reduce((accumulator, amount) => accumulator + amount, 0)

  moneyPlus.innerText = `R$ ${incomes}.00`
  moneyMinus.innerText = `R$ ${expenses}.00`

}


const addTransactionIntoList = (transaction) => {
  const transactionName = document.querySelector('[data-js="text"]').value
  const amountValue = document.querySelector('[data-js="amount"]').value

  const name = transaction.name = transactionName
  const amount = transaction.amount = amountValue
  const newObj = [{ name, amount}]

  return newObj
}


const init = () => {
  transactionsList.forEach(addTransactionIntoDom)
  incomesAndExpenses()
  
}

const clickEvent = (e) => {
  addBtn.onpointerenter = addBtn
  addBtn.setPointerCapture(e.pointerId)

  init()
}

form.addEventListener('submit', dontRefreshPage)
addBtn.onpointerdown = clickEvent
