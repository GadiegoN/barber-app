import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { MenuSheet } from "./menu-sheet"

export function Header() {
  return (
    <header>
      <Card>
        <CardContent className="mx-auto flex w-full max-w-7xl items-center justify-between py-5">
          <Image
            src="/logo.png"
            height={18}
            width={120}
            alt="Logo da barbearia"
          />

          <MenuSheet />
        </CardContent>
      </Card>
    </header>
  )
}
