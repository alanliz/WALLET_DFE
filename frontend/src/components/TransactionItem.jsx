export function TransactionItem({ id, concept, amount, type, date, onEdit, onDelete }) {

  const handleDelete = () => {
    onDelete(id)
  }
  const handleEdit = () => {
    onEdit(id)
  }

  return (
    <>
      <article>
        <h2>{concept}</h2>
        <strong>{amount}</strong>
        <span>{date}</span>
        <span>{type}</span>
        <button onClick={handleDelete}>Eliminar</button>
        <button onClick={handleEdit}>Editar</button>
      </article>
    </>
  )
}