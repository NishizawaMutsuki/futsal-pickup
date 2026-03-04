"use client"

import { CreateMatchForm } from "@/components/pickup/create-match-form"

export default function CreateMatchPage() {
  return (
    <div className="flex justify-center min-h-screen bg-background">
      <div className="relative flex flex-col w-full max-w-[390px] min-h-screen bg-background">
        <CreateMatchForm />
      </div>
    </div>
  )
}
