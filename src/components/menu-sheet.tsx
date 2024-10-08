"use client"

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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { SignInButton } from "./sign-in-button"

export function MenuSheet() {
  const { data } = useSession()

  async function handleLogoutClick() {
    await signOut()
  }

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

        {data?.user ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                className="border-2 border-primary"
                src={data.user.image as string}
              />
              <AvatarFallback className="border-2 border-primary">
                {data.user.name?.slice(2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="truncate text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
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

                  <SignInButton />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}

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
          <Button asChild className="justify-start gap-2" variant="ghost">
            <Link href="/bookings">
              <Calendar size={18} />
              Agendamentos
            </Link>
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          {quickSearchOptions.map((option, i) => (
            <SheetClose key={i} asChild>
              <Button asChild className="justify-start gap-2" variant="ghost">
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    height={18}
                    width={18}
                    quality={100}
                  />
                  {option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>
        <Separator />
        {data?.user && (
          <Button
            onClick={handleLogoutClick}
            className="w-full justify-start gap-2"
            variant="ghost"
          >
            <LogOut size={18} />
            Sair da conta
          </Button>
        )}
      </SheetContent>
    </Sheet>
  )
}
