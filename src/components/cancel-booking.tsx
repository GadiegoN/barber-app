"use client"
import { deleteBooking } from "@/actions/delete-booking"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { SheetClose } from "./ui/sheet"

interface BookingIdProps {
  bookingId: string
}

export function CancelBooking({ bookingId }: BookingIdProps) {
  async function handleCancelBooking(bookingId: string) {
    try {
      await deleteBooking(bookingId)
      toast.success("Reserva cancelada!")
    } catch (error) {
      toast.error("Erro ao cancelar sua reserva. Tente novamente!")
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" className="w-full">
          Cancelar reserva
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-11/12">
        <AlertDialogHeader>
          <AlertDialogTitle>Voce quer cancelar sua reserva?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao cancelar, você perderá sua reserva e não poderá recuperá-la. Essa
            ação é irreversível.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row items-center gap-3">
          <AlertDialogCancel className="w-full">Voltar</AlertDialogCancel>
          <SheetClose asChild>
            <AlertDialogAction
              onClick={() => handleCancelBooking(bookingId)}
              className="w-full"
            >
              Confirmar
            </AlertDialogAction>
          </SheetClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
