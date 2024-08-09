import Image from "next/image"
import { Button } from "./ui/button"
import { Calendar, Home, LogIn, LogOut, Menu, User } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Separator } from "./separator"
import { quickSearchOptions } from "@/constants/search"
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
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

        {/* <div className="flex items-center gap-3">
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
        </div> */}

        <div className="flex items-center gap-3">
          <div className="rounded-full border border-primary p-1">
            <User size={40} />
          </div>
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-bold">Olá, faça seu login</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogIn />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-11/12">
                <DialogHeader>
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google.
                  </DialogDescription>
                </DialogHeader>

                <Button
                  variant="outline"
                  className="items-center gap-1 font-bold"
                >
                  <Image
                    src="/google-logo.svg"
                    width={18}
                    height={18}
                    alt="Fazer login com o google"
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
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
