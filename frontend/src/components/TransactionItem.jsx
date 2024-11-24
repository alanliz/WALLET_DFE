import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditTransactionFormSheet } from "./EditTransaction";
import { ConfirmDeleteTransaction } from "./ConfirmDeleteTransaction";

export function TransactionItem({ id, concept, amount, type, date, onEdit, onDelete }) {
  const handleDelete = () => {
    onDelete(id)
  };

  const handleEdit = (data) => {
    onEdit(id, data.concept, data.amount, data.label);
  };

  const formattedDate = new Date(date).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{concept}</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">{formattedDate}</CardDescription>
      </CardHeader>

      <CardContent className="flex justify-between items-center">
        <div className={`font-semibold text-2xl ${type === "income" ? "text-green-500" : "text-red-500"
          }`}>
          {type === "income" ? "Ingreso" : "Egreso"}
        </div>
        <div
          className={`font-semibold text-2xl ${type === "income" ? "text-green-500" : "text-red-500"
            }`}
        >
          {amount.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}
        </div>
      </CardContent>

      <CardFooter className="flex justify-end space-x-4">
        <EditTransactionFormSheet
          amount={amount}
          concept={concept}
          type={type}
          onEditTransaction={handleEdit}
          trigger={
            <Button variant="outline" size="lg" onClick={handleEdit}>
              Editar
            </Button>
          }
        />
        <ConfirmDeleteTransaction
          trigger={
            <Button variant="destructive" size="lg">
              Eliminar
            </Button>
          }
          onDelete={handleDelete}
        />
      </CardFooter>
    </Card>
  );
}
