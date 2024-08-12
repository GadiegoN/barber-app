import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Separator } from "./separator"
import Image from "next/image"
import { PhoneItem } from "./phone-item"
import { Button } from "./ui/button"
import { CancelBooking } from "./cancel-booking"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const {
    service: { barbershop },
  } = booking

  const isConfirmed = isFuture(booking.date)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="mx-auto w-10/12 cursor-pointer md:w-11/12">
          <CardContent className="flex h-32 justify-between p-0">
            <div className="flex flex-col justify-center gap-2 px-4">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage src={barbershop.imageUrl} />
                  <AvatarFallback>{barbershop.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </div>
            <div className="flex w-3/12 flex-col items-center justify-center border-l-2">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-11/12">
        <div className="h-5/6 space-y-6">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da reserva
            </SheetTitle>
          </SheetHeader>
          <Separator />

          <div className="relative flex h-44 w-full items-end pb-2">
            <Image
              src="/map.png"
              fill
              className="rounded-xl object-cover"
              alt={`Mapa da barbearia ${barbershop.name}`}
            />

            <Card className="z-10 mx-auto flex w-11/12 items-center rounded-xl">
              <CardContent className="flex items-center gap-4 p-4">
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                  <AvatarFallback>{barbershop.name.slice(0, 2)}</AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-lg font-bold">{barbershop.name}</h3>
                  <p className="truncate text-sm">{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="mx-auto w-full p-3">
            <CardContent className="w-full space-y-3">
              <div className="flex w-full items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm font-bold">
                  {format(booking.date, "d 'de' MMMM", { locale: ptBR })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm font-bold">
                  {format(booking.date, "HH:mm", { locale: ptBR })} hrs
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="truncate text-sm font-bold">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {barbershop.phones.map((phone, i) => (
            <PhoneItem key={i} phone={phone} />
          ))}
        </div>

        <SheetFooter>
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && <CancelBooking bookingId={booking.id} />}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
