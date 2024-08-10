"use client"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"
import { ptBR } from "date-fns/locale"
import { Separator } from "./separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "./ui/card"
import { BarbershopService, Booking } from "@prisma/client"
import { addDays, format, set } from "date-fns"
import { createBooking } from "@/actions/create-booking"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { getBookings } from "@/actions/get-bookings"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SignInButton } from "./sign-in-button"

const TIME_LIST = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
]

function getTimeList(bookings: Booking[]) {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }

    return true
  })
}

interface ServiceProps {
  service: BarbershopService
  barberShop: string
}

export function MakeReservation({ service, barberShop }: ServiceProps) {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBooking] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    if (!selectedDay) {
      return
    }

    const fetch = async () => {
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })

      setDayBooking(bookings)
    }

    fetch()
  }, [selectedDay, service.id])

  function handleDateSelect(date: Date | undefined) {
    setSelectedDay(date)
  }

  function handleTimeSelected(time: string) {
    setSelectedTime(time)
  }

  function handleBookingSheetIsOpen() {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBooking([])
    setBookingSheetIsOpen(false)
  }

  async function handleCreateBooking() {
    try {
      if (!selectedDay || !selectedTime) return
      const hour = Number(selectedTime.split(":")[0])
      const minute = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })
      await createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate,
      })

      handleBookingSheetIsOpen()

      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva!")
    }
  }

  return (
    <Sheet open={bookingSheetIsOpen} onOpenChange={handleBookingSheetIsOpen}>
      {data?.user ? (
        <Button
          size="sm"
          variant="secondary"
          disabled={data?.user ? false : true}
          onClick={() => setBookingSheetIsOpen(true)}
        >
          Reservar
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              disabled={!data?.user ? false : true}
            >
              Reservar
            </Button>
          </DialogTrigger>
          <DialogContent className="w-11/12">
            <DialogHeader>
              <DialogTitle>Faça login na plataforma</DialogTitle>
              <DialogDescription>
                Conecte-se usando sua conta do Google.
              </DialogDescription>
            </DialogHeader>

            <SignInButton />
          </DialogContent>
        </Dialog>
      )}
      <SheetContent className="items-center space-y-5 px-0">
        <SheetHeader>
          <SheetTitle>Fazer Reserva</SheetTitle>
        </SheetHeader>

        <Separator />
        <div>
          <Calendar
            fromDate={addDays(new Date(), 1)}
            mode="single"
            selected={selectedDay}
            onSelect={handleDateSelect}
            locale={ptBR}
            styles={{
              head_cell: {
                width: "100%",
                textTransform: "capitalize",
              },
              cell: {
                width: "100%",
              },
              button: {
                width: "100%",
              },
              nav_button_previous: {
                width: "32px",
                height: "32px",
              },
              nav_button_next: {
                width: "32px",
                height: "32px",
              },
              caption: {},
            }}
          />
        </div>
        <Separator />

        {selectedDay ? (
          <ScrollArea className="mx-auto w-full whitespace-nowrap rounded-md pb-6">
            <div className="flex gap-3 overflow-x-auto px-5">
              {getTimeList(dayBookings).map((time) => (
                <Button
                  variant={selectedTime === time ? "default" : "outline"}
                  className="rounded-full border-2"
                  key={time}
                  onClick={() => handleTimeSelected(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="cursor-pointer" />
          </ScrollArea>
        ) : (
          <p className="ml-5 text-sm font-semibold">
            Selecione um dia para ver os horários disponíveis...
          </p>
        )}
        <Separator />

        {selectedDay && selectedTime ? (
          <Card className="mx-auto w-full p-3">
            <CardContent className="w-full space-y-3">
              <div className="flex w-full items-center justify-between">
                <h2 className="font-bold">{service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(service.price))}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm font-bold">
                  {format(selectedDay, "d 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm font-bold">{selectedTime}</p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="truncate text-sm font-bold">{barberShop}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mx-auto w-11/12 p-3">
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="truncate text-sm font-bold">{barberShop}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <SheetFooter className="mx-auto w-11/12">
          <Button
            disabled={selectedDay && selectedTime ? false : true}
            onClick={handleCreateBooking}
          >
            Confirmar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
