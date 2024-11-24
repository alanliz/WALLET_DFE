import { API_TRANSACTIONS_URL } from "../constants";

export function deleteTransaction({ id }) {

  return fetch(API_TRANSACTIONS_URL + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) res.json().then(err => { throw err })
      return res.json()
    })

}