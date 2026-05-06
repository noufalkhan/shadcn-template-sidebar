"use client"

import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function BuyEstampCta() {
  return (
    <Card
      size="sm"
      className="h-full min-h-[204px] rounded-lg border-0 p-3.5 text-primary-foreground ring-0"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--primary-button-from) 0%, var(--primary-button-to) 100%)",
      }}
    >
      <div className="flex h-full flex-col gap-2.5">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
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
            className="w-fit  border border-border/60 bg-background/95 text-foreground shadow-[0_2px_0_hsl(var(--border))] shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-[0_4px_0_hsl(var(--border))] active:translate-y-0 active:shadow-[0_1px_0_hsl(var(--border))]"
          >
            Buy E-Stamp
          </Button>
        </div>
      </div>
    </Card>
  )
}
