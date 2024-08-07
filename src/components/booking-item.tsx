import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

export function BookingItem() {
  return (
    <>
      <h2 className="ml-10 select-none text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>

      <Card className="mx-auto w-10/12 md:w-11/12">
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
    </>
  )
}
