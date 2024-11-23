import { useEffect, useState } from "react";
import { getTransactions } from "../services/getTransactions";
import { postTransaction } from "../services/postTransaction";

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


  useEffect(() => {
    refreshTransactions()
  }, [])

  return {
    transactions, isLoading, error, refreshTransactions, createTransaction

  }
}