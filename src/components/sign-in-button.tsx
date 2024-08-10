"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import { signIn } from "next-auth/react"

export function SignInButton() {
  async function handleLoginWithGoogleClick() {
    await signIn("google")
  }

  return (
    <Button
      variant="outline"
      className="items-center gap-1 font-bold"
      onClick={handleLoginWithGoogleClick}
    >
      <Image
        src="/google-logo.svg"
        width={18}
        height={18}
        alt="Fazer login com o google"
      />
      Google
    </Button>
  )
}
