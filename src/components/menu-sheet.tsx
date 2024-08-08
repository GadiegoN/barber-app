import Image from "next/image"
import { Button } from "./ui/button"
import { Calendar, Home, LogOut, Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet"
import { Separator } from "./separator"
import { quickSearchOptions } from "@/constants/search"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"

export function MenuSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-4 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              className="border-2 border-primary"
              src="https://github.com/gadiegon.png"
            />
            <AvatarFallback className="border-2 border-primary">
              GN
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold">Gadiego Nogueira</p>
            <p className="truncate text-xs">gadiego@gmail.com</p>
          </div>
        </div>

        <Separator />
        <div className="flex flex-col gap-4">
          <SheetClose asChild>
            <Button asChild className="justify-start gap-2" variant="ghost">
              <Link href="/">
                <Home size={18} />
                ìnicio
              </Link>
            </Button>
          </SheetClose>
          <Button className="justify-start gap-2" variant="ghost">
            <Calendar size={18} />
            Agendamentos
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          {quickSearchOptions.map((option, i) => (
            <Button key={i} className="justify-start gap-2" variant="ghost">
              <Image
                src={option.imageUrl}
                alt={option.title}
                height={18}
                width={18}
                quality={100}
              />
              {option.title}
            </Button>
          ))}
        </div>
        <Separator />
        <Button className="justify-start gap-2" variant="ghost">
          <LogOut size={18} />
          Sair da conta
        </Button>
      </SheetContent>
    </Sheet>
  )
}
