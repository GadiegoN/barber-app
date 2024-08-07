import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"

interface BarberShopItemProps {
  barbershop: Barbershop
}

export async function BarberShopItem({ barbershop }: BarberShopItemProps) {
  return (
    <Card className="min-w-48 select-none rounded-2xl">
      <CardContent className="space-y-3 p-0">
        <div className="relative h-36 w-full">
          <Image
            alt={barbershop.name}
            src={barbershop.imageUrl}
            className="rounded-t-2xl object-cover"
            fill
          />
          <Badge
            variant="secondary"
            className="absolute left-2 top-2 z-10 space-x-1"
          >
            <Star size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5.0</p>
          </Badge>
        </div>

        <div className="mx-auto w-11/12 space-y-2">
          <h3 className="line-clamp-1 font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button asChild variant="secondary" className="w-full">
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
          <div />
        </div>
      </CardContent>
    </Card>
  )
}
