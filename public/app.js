const balance = document.querySelector('[data-js="balance"]')

const moneyPlus = document.querySelector('[data-js="money-plus"]')
const moneyMinus = document.querySelector('[data-js="money-minus"]')

const form = document.querySelector('[data-js="form"]')
const addBtn = document.querySelector('[data-js="add-btn"]')

const dontRefreshPage = event => event.preventDefault()


const getTransactionsList = (amount) => {
  const transactionsList = []

  if (amount > 0) {
    transactionsList.push({ income: amount })
  } else if (amount < 0) {
    transactionsList.push({ expense: amount })
  }

  return transactionsList
}

const incomes = amount => {
  if (amount > 0) {
    transactionsList.map(({ income }) => {
      return `${income}`
    })

  }
}

const expenses = amount => {
  if (amount < 0) {
    transactionsList.map(({ expense }) => {
      return `${expense}`
    })
  }
}

const clickEvent = (e) => {
  addBtn.onpointerenter = addBtn
  addBtn.setPointerCapture(e.pointerId)

  const amount = document.querySelector('[data-js="amount"]').value
  
  const inOrOut = getTransactionsList(+amount)
  console.log(inOrOut)
}


form.addEventListener('submit', dontRefreshPage)
addBtn.onpointerdown = clickEvent