import React from "react"
import { CreateTransactionFormSheet } from "./components/CreateTransactionFormSheet"
import { TransactionsView } from "./components/TransactionsView"
import { Button } from "./components/ui/button"
import { useTransactions } from "./hooks/useTransactions"
import { Plus } from "lucide-react"

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
        <Button className="fixed bottom-3 right-3"><Plus />Crear transacción</Button>
      } />
    </main >
  )
}

export default App
