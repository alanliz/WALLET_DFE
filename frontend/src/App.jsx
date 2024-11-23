import React from "react"
import { CreateTransactionFormSheet } from "./components/CreateTransactionFormSheet"
import { TransactionsView } from "./components/TransactionsView"
import { Button } from "./components/ui/button"
import { useTransactions } from "./hooks/useTransactions"

function App() {

  const { transactions, isLoading, error, refreshTransactions, createTransaction } = useTransactions()

  const handleCreateTransaction = (data) => {
    createTransaction(data)
  }

  return (
    <main>
      <React.Suspense fallback={<div>Cargando...</div>}>
        <TransactionsView transactions={transactions} />
      </React.Suspense>
      <CreateTransactionFormSheet onCreateTransaction={handleCreateTransaction} trigger={
        <Button>Crear nueva transacción</Button>
      } />
    </main >
  )
}

export default App
