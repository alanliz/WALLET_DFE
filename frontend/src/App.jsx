import React from "react"
import { CreateTransactionFormSheet } from "./components/CreateTransactionFormSheet"
import { TransactionsView } from "./components/TransactionsView"
import { Button } from "./components/ui/button"
import { useTransactions } from "./hooks/useTransactions"
import { Plus } from "lucide-react"

function App() {

  const { transactions, isLoading, error, createTransaction, deleteTransaction, updateTransaction } = useTransactions()

  const handleCreateTransaction = (data) => {
    createTransaction(data)
  }

  const handleEditTransaction = (id, concept, amount, label) => {
    updateTransaction({ id, concept, amount, label })
  }

  const handleDeleteTransaction = (id) => {
    deleteTransaction(id)
  }

  return (
    <main>
      <React.Suspense fallback={<div>Cargando...</div>}>
        <TransactionsView
          isLoading={isLoading}
          error={error}
          transactions={transactions}
          onDelete={handleDeleteTransaction}
          onEdit={handleEditTransaction}
        />
      </React.Suspense>
      <CreateTransactionFormSheet onCreateTransaction={handleCreateTransaction} trigger={
        <Button className="fixed bottom-2 sm:bottom-32 right-3"><Plus />Crear transacción</Button>
      } />
    </main >
  )
}

export default App
