import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"

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
  const isConfirmed = isFuture(booking.date)

  return (
    <Card className="mx-auto w-10/12 md:w-11/12">
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
              <AvatarImage src={booking.service.barbershop.imageUrl} />
              <AvatarFallback>
                {booking.service.barbershop.name.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm">{booking.service.barbershop.name}</p>
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
  )
}
