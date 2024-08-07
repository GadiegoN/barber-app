import { BarbershopService } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"

interface ServiceProps {
  service: BarbershopService
}

export function ServiceItem({ service }: ServiceProps) {
  return (
    <Card className="flex h-28 justify-between">
      <CardContent className="flex w-full gap-3 p-0">
        <div className="relative size-28">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <div className="mr-2 flex flex-1 flex-col justify-evenly">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="line-clamp-2 text-sm text-gray-400">
            {service.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Button size="sm" variant="secondary">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
