const balance = document.querySelector('[data-js="balance"]')
const moneyPlus = document.querySelector('[data-js="money-plus"]')
const moneyMinus = document.querySelector('[data-js="money-minus"]')

const form = document.querySelector('[data-js="form"]')
const addBtn = document.querySelector('[data-js="add-btn"]')

const transactionsList = [
  {id: 1, name: 'Aluguel', amount: -300},
  {id: 2, name: 'Salário', amount: 900},
  {id: 3, name: 'Alimentação', amount: 300}
]

const addTransactionIntoDom = (transaction) => {
  const li = document.createElement('li')
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
  const operator = transaction.amount > 0 ? '' : '-'
  const amountWithoutOperator = Math.abs(transaction.amount)
  li.classList.add(CSSClass)
  li.classList.add('border-b-2')
  li.classList.add('border-stone-400')
  

  li.innerHTML = `${transaction.name}: R$ ${operator}${amountWithoutOperator}`

  const fragment = document.createDocumentFragment()
  const transactionsUl = document.querySelector('[data-js="transactions-list"]')


  fragment.append(li)
  transactionsUl.prepend(fragment)
  
}


const init = transactionsList.forEach(addTransactionIntoDom);

const dontRefreshPage = event => event.preventDefault()


const clickEvent = (e) => {
  addBtn.onpointerenter = addBtn
  addBtn.setPointerCapture(e.pointerId)

  const amount = document.querySelector('[data-js="amount"]').value
}

form.addEventListener('submit', dontRefreshPage)
addBtn.onpointerdown = clickEvent