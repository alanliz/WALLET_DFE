import { useTransactions } from "../hooks/useTransactions";
import { TransactionItem } from "./TransactionItem";

export function TransactionsView() {
  const { transactions, isLoading, error, refreshTransactions } = useTransactions();

  const handleDelete = (id) => {
    console.log("Eliminar transacción:", id);
  };

  const handleEdit = (id) => {
    console.log("Editar transacción:", id);
  };

  if (isLoading) return <p>Cargando transacciones...</p>;
  if (error) return <p>Error al cargar las transacciones</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-8 flex flex-col items-center flex-grow">
        <h1 className="text-3xl font-bold mb-6">My Wallet</h1>

        <div className="w-full max-w-2xl space-y-6">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              {...transaction}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-4 mt-8">
        <div className="text-center space-y-2">
          <p className="text-2xl font-semibold">Proyecto Final Front-End</p>
          <p className="text-sm">
            Creado por: <span className="font-bold">Octavio Zenil López</span>,{" "}
            <span className="font-bold">Luis Alberto Miranda Díaz</span>,{" "}
            <span className="font-bold">Alan Gilberto Lizardi Díaz</span>,{" "}
            <span className="font-bold">Adán Paul Ortega Gómez</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
