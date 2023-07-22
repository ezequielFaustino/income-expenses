const balance = document.querySelector('[data-js="balance"]')

const moneyPlus = document.querySelector('[data-js="money-plus"]')
const moneyMinus = document.querySelector('[data-js="money-minus"]')

const form = document.querySelector('[data-js="form"]')
const addBtn = document.querySelector('[data-js="add-btn"]')

const dontRefreshPage = event => event.preventDefault()

const transactionsList = []

const incomes = amount => {
  if(amount > 0) {
    transactionsList.push({income: amount})
    const total = transactionsList.reduce((accumulator, {income}) => {
      const sum = accumulator + income
      return sum
    }, 0)

    return total
  }
}

const expenses = amount => {
  if (amount < 0) {
    transactionsList.push({ expense: amount })
    const total = transactionsList.reduce((accumulator, { expense }) => {
      const sum = accumulator + expense
      return sum
    }, 0)

    return total
  }
}

const clickEvent = (e) => {
  addBtn.onpointerenter = addBtn
  addBtn.setPointerCapture(e.pointerId)

  const amount = document.querySelector('[data-js="amount"]').value

  const totalIncomes = incomes(+amount)
  const totalExpenses = expenses(+amount)

  console.log(totalIncomes)
  console.log(totalExpenses)
}


form.addEventListener('submit', dontRefreshPage)
addBtn.onpointerdown = clickEvent