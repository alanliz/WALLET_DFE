import { API_TRANSACTIONS_URL } from "../constants";

export function putTransaction({ id, concept, amount, label }) {

  const body = JSON.stringify({ concept, amount, label })

  return fetch(API_TRANSACTIONS_URL + `/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then(res => {
      if (!res.ok) res.json().then(err => { throw err })
      return res.json()
    })

}