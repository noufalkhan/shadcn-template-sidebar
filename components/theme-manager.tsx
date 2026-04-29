"use client"

import * as React from "react"
import {
  Check,
  Monitor,
  Moon,
  Palette,
  Settings2,
  Sparkles,
  Sun,
  Type,
  Zap,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type ThemeMode = "light" | "dark" | "system"
type Accent = "slate" | "emerald" | "blue" | "violet" | "rose" | "amber"
type Radius = "default" | "comfortable" | "compact"
type Motion = "default" | "reduced"
type Scale = "sm" | "md" | "lg"

const STORAGE_KEYS = {
  accent: "app-accent",
  radius: "app-radius",
  motion: "app-motion",
  scale: "app-scale",
} as const

const ACCENT_OPTIONS: Array<{ id: Accent; label: string; previewClass: string }> = [
  { id: "slate", label: "Slate", previewClass: "bg-slate-500" },
  { id: "emerald", label: "Emerald", previewClass: "bg-emerald-500" },
  { id: "blue", label: "Blue", previewClass: "bg-blue-500" },
  { id: "violet", label: "Violet", previewClass: "bg-violet-500" },
  { id: "rose", label: "Rose", previewClass: "bg-rose-500" },
  { id: "amber", label: "Amber", previewClass: "bg-amber-500" },
]

const RADIUS_OPTIONS: Array<{ id: Radius; label: string }> = [
  { id: "compact", label: "Compact" },
  { id: "default", label: "Default" },
  { id: "comfortable", label: "Comfortable" },
]

const SCALE_OPTIONS: Array<{ id: Scale; label: string; preview: string }> = [
  { id: "sm", label: "Small", preview: "90%" },
  { id: "md", label: "Default", preview: "100%" },
  { id: "lg", label: "Large", preview: "110%" },
]

function readStoredValue<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  if (typeof window === "undefined") {
    return fallback
  }

  const rawValue = window.localStorage.getItem(key)
  if (rawValue && allowed.includes(rawValue as T)) {
    return rawValue as T
  }

  return fallback
}

function applyAccent(accent: Accent) {
  document.documentElement.dataset.accent = accent
}

function applyRadius(radius: Radius) {
  document.documentElement.dataset.radius = radius
}

function applyMotion(motion: Motion) {
  document.documentElement.dataset.motion = motion
}

function applyScale(scale: Scale) {
  document.documentElement.dataset.scale = scale
}

export function ThemeManager({ trigger }: { trigger: React.ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [accent, setAccent] = React.useState<Accent>("emerald")
  const [radius, setRadius] = React.useState<Radius>("default")
  const [motion, setMotion] = React.useState<Motion>("default")
  const [scale, setScale] = React.useState<Scale>("md")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const storedAccent = readStoredValue<Accent>(
      STORAGE_KEYS.accent,
      ACCENT_OPTIONS.map((item) => item.id),
      "emerald"
    )
    const storedRadius = readStoredValue<Radius>(
      STORAGE_KEYS.radius,
      RADIUS_OPTIONS.map((item) => item.id),
      "default"
    )
    const storedMotion = readStoredValue<Motion>(STORAGE_KEYS.motion, ["default", "reduced"], "default")
    const storedScale = readStoredValue<Scale>(STORAGE_KEYS.scale, SCALE_OPTIONS.map((item) => item.id), "md")
    setAccent(storedAccent)
    setRadius(storedRadius)
    setMotion(storedMotion)
    setScale(storedScale)
    applyAccent(storedAccent)
    applyRadius(storedRadius)
    applyMotion(storedMotion)
    applyScale(storedScale)
    if (!window.localStorage.getItem(STORAGE_KEYS.accent)) {
      window.localStorage.setItem(STORAGE_KEYS.accent, storedAccent)
    }
    if (!window.localStorage.getItem(STORAGE_KEYS.radius)) {
      window.localStorage.setItem(STORAGE_KEYS.radius, storedRadius)
    }
    if (!window.localStorage.getItem(STORAGE_KEYS.motion)) {
      window.localStorage.setItem(STORAGE_KEYS.motion, storedMotion)
    }
    if (!window.localStorage.getItem(STORAGE_KEYS.scale)) {
      window.localStorage.setItem(STORAGE_KEYS.scale, storedScale)
    }
    setMounted(true)
  }, [])

  function onAccentChange(nextAccent: Accent) {
    setAccent(nextAccent)
    applyAccent(nextAccent)
    window.localStorage.setItem(STORAGE_KEYS.accent, nextAccent)
  }

  function onRadiusChange(nextRadius: Radius) {
    setRadius(nextRadius)
    applyRadius(nextRadius)
    window.localStorage.setItem(STORAGE_KEYS.radius, nextRadius)
  }

  function onMotionChange(nextMotion: Motion) {
    setMotion(nextMotion)
    applyMotion(nextMotion)
    window.localStorage.setItem(STORAGE_KEYS.motion, nextMotion)
  }

  function onScaleChange(nextScale: Scale) {
    setScale(nextScale)
    applyScale(nextScale)
    window.localStorage.setItem(STORAGE_KEYS.scale, nextScale)
  }

  function resetThemePreferences() {
    onAccentChange("emerald")
    onRadiusChange("default")
    onMotionChange("default")
    onScaleChange("md")
    setTheme("system")
  }

  const activeTheme = (mounted ? theme : "system") as ThemeMode
  const resolvedLabel = resolvedTheme ?? "system"

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings2 className="size-4" />
            Theme manager
          </SheetTitle>
          <SheetDescription>
            Personalize appearance with live previews. Changes apply instantly across the app.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 px-4 pb-4">
          <div className="grid grid-cols-2 gap-2 rounded-lg border bg-card p-3">
            <div>
              <p className="text-xs text-muted-foreground">Current mode</p>
              <p className="font-medium capitalize">{resolvedLabel}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Active accent</p>
              <p className="font-medium capitalize">{accent}</p>
            </div>
          </div>

          <section className="space-y-2">
            <h3 className="text-sm font-semibold">Appearance mode</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={activeTheme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
              >
                <Sun className="size-4" />
                Light
              </Button>
              <Button
                variant={activeTheme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
              >
                <Moon className="size-4" />
                Dark
              </Button>
              <Button
                variant={activeTheme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
              >
                <Monitor className="size-4" />
                System
              </Button>
            </div>
          </section>

          <Separator />

          <section className="space-y-2">
            <h3 className="text-sm font-semibold">Accent palette</h3>
            <div className="grid grid-cols-3 gap-2">
              {ACCENT_OPTIONS.map((option) => (
                <Button
                  key={option.id}
                  type="button"
                  variant={accent === option.id ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => onAccentChange(option.id)}
                >
                  <span className={cn("size-2.5 rounded-full", option.previewClass)} />
                  {option.label}
                  {accent === option.id ? <Check className="ml-auto size-3.5" /> : null}
                </Button>
              ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-2">
            <h3 className="text-sm font-semibold">Corner style</h3>
            <div className="grid grid-cols-3 gap-2">
              {RADIUS_OPTIONS.map((option) => (
                <Button
                  key={option.id}
                  type="button"
                  variant={radius === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onRadiusChange(option.id)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Type className="size-4 text-muted-foreground" />
              Text scale
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {SCALE_OPTIONS.map((option) => (
                <Button
                  key={option.id}
                  type="button"
                  variant={scale === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => onScaleChange(option.id)}
                >
                  {option.preview}
                </Button>
              ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Zap className="size-4 text-muted-foreground" />
              Motion
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={motion === "default" ? "default" : "outline"}
                size="sm"
                onClick={() => onMotionChange("default")}
              >
                Smooth
              </Button>
              <Button
                type="button"
                variant={motion === "reduced" ? "default" : "outline"}
                size="sm"
                onClick={() => onMotionChange("reduced")}
              >
                Reduced
              </Button>
            </div>
          </section>

          <div className="rounded-lg border bg-card p-3">
            <p className="mb-2 text-xs text-muted-foreground">Preview</p>
            <div className="space-y-2 rounded-md border bg-background p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Sample card</p>
                <Palette className="size-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                Accent, spacing, text scale, and motion update live.
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm">Primary action</Button>
                <Button size="sm" variant="outline">
                  Secondary
                </Button>
              </div>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full" onClick={resetThemePreferences}>
            <Sparkles className="size-4" />
            Reset to recommended defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
