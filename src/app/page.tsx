import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="mx-auto flex w-11/12 max-w-7xl flex-col space-y-6">
      <div>
        <h2 className="text-xl font-bold">Olá, Gadiego</h2>
        <p>Terça-feira, 06 de agosto.</p>
      </div>

      <div className="flex items-center gap-2">
        <Input placeholder="Faça sua busca..." />
        <Button>
          <Search />
        </Button>
      </div>

      <div className="relative h-36 w-full md:h-64 lg:h-96">
        <Image
          alt="Agende nos melhores barbeiros da região"
          src="/banner-01.png"
          fill
          quality={100}
          className="rounded-xl object-cover"
        />
      </div>
    </div>
  )
}
