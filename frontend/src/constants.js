export const BACKEND_HOST = import.meta.env.DEV ? 'http://localhost:3000' : window.location.origin

export const API_TRANSACTIONS_URL = new URL('/api/transactions', BACKEND_HOST)


export const CATEGORIES = [
  {
    name: "Comida y/o bebida",
    value: "food_n_drinks"
  },
  {
    name: "Compras",
    value: "shopping"
  },
  {
    name: "Transporte",
    value: "transportation"
  },
  {
    name: "Vida y entretenimiento",
    value: "life_n_entertainment"
  },
  {
    name: "Gastos financieros",
    value: "financial_expenses"
  },
]