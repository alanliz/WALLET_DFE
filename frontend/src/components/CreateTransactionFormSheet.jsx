import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"


export function CreateTransactionFormSheet({ trigger }) {

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader><SheetTitle>Crear nueva transacción</SheetTitle></SheetHeader>

        <main></main>
      </SheetContent>
    </Sheet>
  )
}