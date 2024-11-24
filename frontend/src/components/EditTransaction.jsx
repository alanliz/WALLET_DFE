import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "./ui/form"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CATEGORIES } from "../constants"
import { Button } from "./ui/button"
import { useEffect } from "react"
import { numbersMiddleware } from "../lib/numberState.middleware"

export function EditTransactionFormSheet({ trigger, onEditTransaction, concept, amount, type, label }) {

  const formSchema = z.object({
    concept: z.string().min(8, "El concepto debe tener al menos 8 caracteres").max(255, "El concepto no puede tener más de 255 caracteres"),
    amount: z.string().or(z.number()),//.number().min(1, "La cantidad debe ser mayor a 0").max(1000000, "La cantidad no puede ser mayor a 1.000.000"),
    type: z.enum(["income", "expense"]),
    label: z.optional(z.string())
  })


  const form = useForm({
    defaultValues: {
      concept: concept,
      amount: amount,
      type: type,
      label: label
    },
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (data) => {
    onEditTransaction(data)
  }

  useEffect(() => {
    if (form.getValues('type') == "income") {
      form.setValue('label', "")
    }
  }, [form])


  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="flex flex-col gap-5">
        <SheetHeader><SheetTitle>Editar transacción</SheetTitle></SheetHeader>
        <main >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <FormField
                control={form.control}
                name="concept"
                render={({ field }) => {

                  return (
                    <FormItem>
                      <FormLabel>Concepto</FormLabel>
                      <FormControl>
                        <Input
                          {...field}

                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => {

                  return (
                    <FormItem>
                      <FormLabel>Monto</FormLabel>
                      <FormControl>
                        <Input {...field}
                          type="number"
                          {...numbersMiddleware(1000000, false, true, 2)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />



              {
                type != 'income' &&
                < FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <Select form={form} value={field.value} disabled={form.getValues('type') == 'income'} onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map(category => {
                              return (
                                <SelectItem key={category.value} value={category.value}>{category.name}</SelectItem>
                              )
                            })}

                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              }
              <Button
                type="submit"
                className={form.getValues('type') == "income" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
              >
                Editar
              </Button>

            </form>
          </Form>

        </main>
      </SheetContent>
    </Sheet >
  )
}