import { DialogClose, DialogDescription } from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'

export function ConfirmDeleteTransaction({ trigger, onDelete }) {

  const handleDeleteClick = () => {
    onDelete()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar transacción</DialogTitle>
          <DialogDescription>¿Estás seguro de que deseas eliminar esta transacción?</DialogDescription>
        </DialogHeader>
        <footer className="flex justify-between">
          <DialogClose asChild><Button variant='ghost'>Cancelar</Button></DialogClose>
          <DialogClose asChild><Button variant='destructive' onClick={handleDeleteClick}>Eliminar</Button></DialogClose>
        </footer>
      </DialogContent>
    </Dialog>
  )

}