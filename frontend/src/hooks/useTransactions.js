import { useEffect, useState } from "react";
import { getTransactions } from "../services/getTransactions";

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

  useEffect(() => {
    refreshTransactions()
  }, [])

  return {
    transactions, isLoading, error, refreshTransactions

  }
}