import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"

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

          <Button variant="outline" size="icon">
            <Menu />
          </Button>
        </CardContent>
      </Card>
    </header>
  )
}
