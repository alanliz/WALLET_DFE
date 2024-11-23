import { API_TRANSACTIONS_URL } from "../constants";

export function postTransaction({ concept, amount, type, label }) {

  return fetch(API_TRANSACTIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ concept, amount, type, label })
  })
    .then(res => {
      if (!res.ok) res.json().then(err => { throw err })
      return res.json()
    })

}