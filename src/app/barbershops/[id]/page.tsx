import { ServiceItem } from "@/components/service-item"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/prisma"
import { ChevronLeft, MapPin, Menu, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarberShopPageProps {
  params: {
    id: string
  }
}

export default async function BarberShopDetails({
  params,
}: BarberShopPageProps) {
  const barbershopp = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershopp) {
    return notFound()
  }

  return (
    <div className="space-y-4">
      <div className="relative h-64 w-full">
        <Image
          src={barbershopp.imageUrl as string}
          alt={barbershopp.description as string}
          fill
          quality={100}
          className="bg-center object-cover opacity-60 md:object-top"
        />

        <div className="relative mx-auto h-64 w-full max-w-7xl">
          <Button
            asChild
            size="icon"
            variant="secondary"
            className="absolute left-4 top-4 z-10"
          >
            <Link href="/">
              <ChevronLeft />
            </Link>
          </Button>

          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-4 z-10"
          >
            <Menu />
          </Button>
        </div>
      </div>

      <section className="mx-auto w-11/12 max-w-7xl space-y-2">
        <h1 className="text-xl font-bold">{barbershopp.name}</h1>

        <div className="flex items-center gap-1">
          <MapPin className="text-primary" size={18} />
          <p className="text-sm">{barbershopp.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="fill-primary text-primary" size={18} />
          <p className="text-sm">5.0 (499 avaliações)</p>
        </div>
      </section>

      <div className="flex h-px w-full bg-secondary" />

      <section className="mx-auto w-11/12 max-w-7xl space-y-2">
        <h2 className="select-none text-xs font-bold uppercase text-gray-400">
          Sobre nós
        </h2>
        <p className="text-justify text-sm">{barbershopp.description}</p>
      </section>

      <div className="flex h-px w-full bg-secondary" />

      <section className="mx-auto w-11/12 max-w-7xl space-y-3">
        <h2 className="select-none text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        {barbershopp.services.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </section>
    </div>
  )
}
