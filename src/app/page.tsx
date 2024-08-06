import { BarberShopItem } from "@/components/barber-shop-item"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/prisma"
import { Search } from "lucide-react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default async function Home() {
  const barberShop = await db.barbershop.findMany()

  return (
    <div className="mx-auto flex w-11/12 max-w-7xl flex-col space-y-6">
      <div>
        <h2 className="text-xl font-bold">Olá, Gadiego</h2>
        <p>Terça-feira, 06 de agosto.</p>
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Faça sua busca..." />
        <Button>
          <Search />
        </Button>
      </div>

      <div className="relative h-36 w-full md:h-64 lg:h-96">
        <Image
          alt="Agende nos melhores barbeiros da região"
          src="/banner-01.png"
          fill
          quality={100}
          className="rounded-xl object-cover"
        />
      </div>

      <h2 className="select-none text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>

      <Card>
        <CardContent className="flex h-32 justify-between p-0">
          <div className="flex flex-col justify-center gap-2 px-4">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de cabelo</h3>

            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src="https://github.com/gadiegon.png" />
                <AvatarFallback>GN</AvatarFallback>
              </Avatar>
              <p className="text-sm">Gadiego Nogueira</p>
            </div>
          </div>
          <div className="flex w-3/12 flex-col items-center justify-center border-l-2">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">07</p>
            <p className="text-sm">09:45</p>
          </div>
        </CardContent>
      </Card>

      <h2 className="select-none text-xs font-bold uppercase text-gray-400">
        Recomendados
      </h2>

      <Carousel className="mx-auto w-10/12 max-w-7xl md:w-11/12">
        <CarouselContent className="gap-2">
          {barberShop.map((barberShop) => (
            <CarouselItem
              key={barberShop.id}
              className="basis-1/2 md:basis-1/3"
            >
              <BarberShopItem barbershop={barberShop} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
