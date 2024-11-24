import { useEffect, useState } from "react";
import { getTransactions } from "../services/getTransactions";
import { postTransaction } from "../services/postTransaction";
import { putTransaction } from "../services/putTransaction";
import {
  deleteTransaction as deleteTransactionService
} from "../services/deleteTransaction";

export function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)


  const refreshTransactions = () => {
    setIsLoading(true)
    getTransactions()
      .then(setTransactions)
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false))
  }

  const createTransaction = (transaction) => {
    setIsLoading(true)
    postTransaction(transaction)
      .then(newTransaction => {
        setTransactions([...transactions, newTransaction])
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => setIsLoading(false))

  }

  const updateTransaction = ({ id, concept, amount, label }) => {
    setIsLoading(true)
    putTransaction({ id, concept, amount, label })
      .then(() => {
        refreshTransactions()
      })
    setIsLoading(false)
  }

  const deleteTransaction = (id) => {
    setIsLoading(true)
    deleteTransactionService({ id })
      .then(() => {
        refreshTransactions()
      })
    setIsLoading(false)
  }


  useEffect(() => {
    refreshTransactions()
  }, [])

  return {
    transactions, isLoading, error, refreshTransactions, createTransaction, updateTransaction, deleteTransaction

  }
}