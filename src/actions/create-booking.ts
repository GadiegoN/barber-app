import { db } from "@/lib/prisma"

interface CreateBookingParams {
  userId: string
  serviceId: string
  date: Date
}

export async function createBooking(params: CreateBookingParams) {
  await db.booking.create({
    data: params,
  })
}
