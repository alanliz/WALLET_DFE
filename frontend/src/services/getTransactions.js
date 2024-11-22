import transactionsMock from '../../mocks/transactions.mock.json'

export function getTransactions() {

  return new Promise((res) => res(transactionsMock))
}