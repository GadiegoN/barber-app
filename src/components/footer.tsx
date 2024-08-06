import { Card, CardContent } from "./ui/card"

export function Footer() {
  return (
    <footer>
      <Card>
        <CardContent className="mx-auto flex w-full max-w-7xl items-center justify-center py-5">
          <p className="text-sm text-gray-400">
            &copy; 2024 Copyright{" "}
            <span className="cursor-pointer font-bold">Gadiego Nogueira</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
