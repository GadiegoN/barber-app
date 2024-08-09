import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { MenuSheet } from "./menu-sheet"
import Link from "next/link"

export function Header() {
  return (
    <header>
      <Card>
        <CardContent className="mx-auto flex w-full max-w-7xl items-center justify-between py-5">
          <Link href="/">
            <Image
              src="/logo.png"
              height={18}
              width={120}
              alt="Logo da barbearia"
            />
          </Link>

          <MenuSheet />
        </CardContent>
      </Card>
    </header>
  )
}
