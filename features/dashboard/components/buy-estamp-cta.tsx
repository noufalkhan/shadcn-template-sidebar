"use client"

import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function BuyEstampCta() {
  return (
    <Card
      size="sm"
      className="h-full rounded-lg border-0 p-4 text-primary-foreground ring-0"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--primary-button-from) 0%, var(--primary-button-to) 100%)",
      }}
    >
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm font-medium leading-snug">
            Purchase Digital E-Stamp ?
          </p>
        </div>
        <p className="text-xs leading-relaxed text-primary-foreground/85">
          Complete the required document setup, add party information, and select
          the stamp value to proceed with your e-stamp purchase.
        </p>
        <div className="mt-auto">
          <Button
            size="default"
            className="w-fit rounded-full bg-white text-emerald-700 hover:bg-white/90"
          >
            Buy E-Stamp
          </Button>
        </div>
      </div>
    </Card>
  )
}
