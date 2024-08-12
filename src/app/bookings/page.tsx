import { BookingItem } from "@/components/booking-item"
import { Header } from "@/components/header"
import { Separator } from "@/components/separator"
import { authOption } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { isFuture, isPast } from "date-fns"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Bookings() {
  const user = await getServerSession(authOption)

  if (!user?.user) {
    redirect("/")
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (user.user as any).id,
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

  return (
    <main className="space-y-8">
      <Header />
      <section className="mx-auto w-11/12 max-w-7xl space-y-4">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <div className="space-y-4">
          {bookings.map(
            (booking) =>
              isFuture(booking.date) && (
                <>
                  <BookingItem key={booking.id} booking={booking} />
                </>
              ),
          )}
          <Separator />

          <h2 className="ml-10 select-none text-xs font-bold uppercase text-gray-400">
            Finalizados
          </h2>
          {bookings.map(
            (booking) =>
              isPast(booking.date) && (
                <>
                  <BookingItem key={booking.id} booking={booking} />
                </>
              ),
          )}
        </div>
      </section>
    </main>
  )
}
