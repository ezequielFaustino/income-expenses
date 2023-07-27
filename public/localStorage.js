export const getLocalStorage =  () => JSON.parse(localStorage.getItem('db')) ?? []

export const setLocalStorage = db => localStorage.setItem('db', JSON.stringify(db))

export const list = [
  {name: 'Salário', amount: 2000},
  {name: 'Aluguel', amount: -600}
]
