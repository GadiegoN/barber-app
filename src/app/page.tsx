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
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOption } from "@/lib/auth"
import { Separator } from "@/components/separator"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default async function Home() {
  const session = await getServerSession(authOption)
  const barberShop = await db.barbershop.findMany()
  const popularBarberShop = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div className="space-y-8">
      <Header />
      <div className="mx-auto flex w-11/12 max-w-7xl flex-col space-y-6">
        <div>
          <h2 className="text-xl font-bold">
            Olá, {session?.user ? session.user.name : "bem vindo!"}
          </h2>
          <div className="flex gap-2">
            <span className="capitalize">
              {format(new Date(), "EEEE, d", { locale: ptBR })}
            </span>
            <span>de</span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </div>
        </div>

        <Search />

        <ScrollArea className="mx-auto w-full whitespace-nowrap rounded-md pb-4">
          <div className="flex gap-3">
            {quickSearchOptions.map((option, i) => (
              <Button asChild key={i} variant="secondary" className="gap-2">
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    width={16}
                    height={16}
                    alt={option.title}
                  />
                  {option.title}
                </Link>
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

        {bookings.length > 0 && (
          <>
            <h2 className="ml-10 select-none text-xs font-bold uppercase text-gray-400">
              Agendamentos
            </h2>
            <Carousel className="mx-auto w-10/12">
              <CarouselContent className="gap-2">
                {bookings.map((booking) => (
                  <CarouselItem
                    key={booking.id}
                    className="basis-3/3 w-full lg:basis-1/3"
                  >
                    <BookingItem
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </>
        )}

        <Separator />

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

        <Separator />

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
