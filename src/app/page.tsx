import { BarberShopItem } from "@/components/barber-shop-item"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/prisma"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { quickSearchOptions } from "@/constants/search"
import { BookingItem } from "@/components/booking-item"
import { Header } from "@/components/header"
import { Search } from "@/components/search"

export default async function Home() {
  const barberShop = await db.barbershop.findMany()
  const popularBarberShop = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="space-y-8">
      <Header />
      <div className="mx-auto flex w-11/12 max-w-7xl flex-col space-y-6">
        <div>
          <h2 className="text-xl font-bold">Olá, Gadiego</h2>
          <p>Terça-feira, 06 de agosto.</p>
        </div>

        <Search />

        <ScrollArea className="mx-auto w-full whitespace-nowrap rounded-md pb-4">
          <div className="flex gap-3">
            {quickSearchOptions.map((option, i) => (
              <Button key={i} variant="secondary" className="gap-2">
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="cursor-pointer" />
        </ScrollArea>

        <div className="relative h-36 w-full md:h-64 lg:h-96">
          <Image
            alt="Agende nos melhores barbeiros da região"
            src="/banner-01.png"
            fill
            quality={100}
            className="rounded-xl object-cover"
          />
        </div>

        <BookingItem />

        <h2 className="ml-10 select-none text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <Carousel className="mx-auto w-10/12 max-w-7xl md:w-11/12 xl:w-full">
          <CarouselContent className="gap-2">
            {barberShop.map((barberShop) => (
              <CarouselItem
                key={barberShop.id}
                className="basis-2/3 md:basis-1/3"
              >
                <BarberShopItem barbershop={barberShop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <h2 className="ml-10 select-none text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>

        <Carousel className="mx-auto w-10/12 max-w-7xl md:w-11/12 xl:w-full">
          <CarouselContent className="gap-2">
            {popularBarberShop.map((barberShop) => (
              <CarouselItem
                key={barberShop.id}
                className="basis-2/3 md:basis-1/3"
              >
                <BarberShopItem barbershop={barberShop} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
