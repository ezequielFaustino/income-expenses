const balanceDisplay = document.querySelector('[data-js="balance"]')
const moneyPlusDisplay = document.querySelector('[data-js="money-plus"]')
const moneyMinusDisplay = document.querySelector('[data-js="money-minus"]')
const form = document.querySelector('[data-js="form"]')
const transactionInput = document.querySelector('[data-js="text"]')
const amountInput = document.querySelector('[data-js="amount"]')
const transactionsUl = document.querySelector('[data-js="transactions-list"]')
const addBtn = document.querySelector('[data-js="add-btn"]')

let transactions = []

const delTransaction = ID => {
  transactions = transactions.filter(transaction =>
    transaction.id !== ID)
 
  console.log(transactions)

}

const addTransactionIntoDom = ({amount, name, id}) => {
  const li = document.createElement('li')
  const CSSClass = amount < 0 ? 'minus' : 'plus'
  const operator = amount > 0 ? '' : '-'
  const amountWithoutOperator = Math.abs(amount)
  li.classList.add(CSSClass)
  li.classList.add('border-b-2')
  li.classList.add('border-sky-400')

  li.innerHTML =`
    <button class="delete-btn" onClick="delTransaction(${id})"></button>
      X
    </button> 
    ${name} 
    R$ ${operator}${amountWithoutOperator}`
  
  const fragment = document.createDocumentFragment()
  fragment.append(li)
  transactionsUl.append(fragment)
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
  const transactionsAmounts = transactions.map(({amount}) => amount)

  const total = getTotal(transactionsAmounts)

  const income = getIncome(transactionsAmounts)

  const expense = getExpense(transactionsAmounts)

  balanceDisplay.textContent = `R$${total}`
  moneyMinusDisplay.textContent = `R$ ${expense}`
  moneyPlusDisplay.textContent = `R$ ${income}`
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

const addTransactionsArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount)
  })

}

const handleFormSubmit = event => {
  event.preventDefault()
  
  const transactionName = transactionInput.value.trim()
  const transactionAmount = amountInput.value.trim()
  const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

  if(isSomeInputEmpty) {
    alert('Por favor, preecha tanto a transação quanto o valor!')
    return
  }

  
  addTransactionsArray(transactionName, transactionAmount)
  init()
  cleanInputs()
  transactionInput.focus()
}

form.addEventListener('submit', handleFormSubmit)
