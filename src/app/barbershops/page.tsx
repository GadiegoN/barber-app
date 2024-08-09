import { BarberShopItem } from "@/components/barber-shop-item"
import { Header } from "@/components/header"
import { Search } from "@/components/search"
import { db } from "@/lib/prisma"

interface BarberShopsProps {
  searchParams: {
    search?: string
  }
}

export default async function BarberShops({ searchParams }: BarberShopsProps) {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  })
  return (
    <div className="w-full space-y-6">
      <Header />
      <div className="mx-auto w-11/12 max-w-7xl space-y-4">
        <Search />
        <h2 className="select-none text-xs font-bold uppercase text-gray-400">
          {`Resultados para "${searchParams.search}"`}
        </h2>

        <div className="flex flex-wrap justify-around gap-4">
          {barbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
