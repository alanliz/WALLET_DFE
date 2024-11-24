import { API_TRANSACTIONS_URL } from '../constants'

export function getTransactions() {

  return fetch(API_TRANSACTIONS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) res.json().then(err => { throw err })
      return res.json()
    })
}