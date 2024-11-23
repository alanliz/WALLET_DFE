import { TransactionItem } from "./TransactionItem"

export function TransactionsView({ transactions }) {



  const handleDelete = (id) => {

  }
  const handleEdit = (id) => {

  }

  return (
    <>
      <ul>
        {transactions.map(transaction => {
          return (
            <li key={`transaction-${transaction.id}`}>
              <TransactionItem {...transaction} onDelete={handleDelete} onEdit={handleEdit} />
            </li>
          )
        })}
      </ul>
    </>
  )
}