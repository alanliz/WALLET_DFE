import React from "react"
import { CreateTransactionFormSheet } from "./components/CreateTransactionFormSheet"
import { TransactionsView } from "./components/TransactionsView"
import { Button } from "./components/ui/button"


function App() {

  return (
    <main>
      <React.Suspense fallback={<div>Cargando...</div>}>
        <TransactionsView />
      </React.Suspense>
      <CreateTransactionFormSheet trigger={
        <Button>Crear nueva transacción</Button>
      } />
    </main >
  )
}

export default App
