"use client"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { ptBR } from "date-fns/locale"
import { Separator } from "./separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "./ui/card"
import { BarbershopService } from "@prisma/client"
import { format, set } from "date-fns"
import { createBooking } from "@/actions/create-booking"

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

interface ServiceProps {
  service: BarbershopService
  barberShop: string
}

export function MakeReservation({ service, barberShop }: ServiceProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("")

  function handleDateSelect(date: Date | undefined) {
    setSelectedDay(date)
  }

  function handleTimeSelected(time: string) {
    setSelectedTime(time)
  }

  async function handleCreateBooking() {
    if (!selectedDay || selectedTime) {
      return
    }

    const hours = Number(selectedTime.split(":")[0])
    const minutes = Number(selectedTime.split(":")[1])

    const newDate = set(selectedDay, {
      minutes,
      hours,
    })

    await createBooking({
      serviceId: service.id,
      userId: "gadiegonid",
      date: newDate,
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" variant="secondary">
          Reservar
        </Button>
      </SheetTrigger>
      <SheetContent className="items-center space-y-5 px-0">
        <SheetHeader>
          <SheetTitle>Fazer Reserva</SheetTitle>
        </SheetHeader>

        <Separator />
        <div>
          <Calendar
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
              {TIME_LIST.map((time) => (
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
          <SheetClose asChild>
            <Button onClick={handleCreateBooking}>Confirmar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
