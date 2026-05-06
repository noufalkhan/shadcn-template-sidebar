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

type ThemeMode = "light" | "dark" | "semi-dark" | "system"
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

const ACCENT_OPTIONS: Array<{ id: Accent; previewClass: string; glowClass: string }> = [
  { id: "slate", previewClass: "bg-slate-500", glowClass: "shadow-slate-500/50" },
  { id: "emerald", previewClass: "bg-emerald-500", glowClass: "shadow-emerald-500/50" },
  { id: "blue", previewClass: "bg-blue-500", glowClass: "shadow-blue-500/50" },
  { id: "violet", previewClass: "bg-violet-500", glowClass: "shadow-violet-500/50" },
  { id: "rose", previewClass: "bg-rose-500", glowClass: "shadow-rose-500/50" },
  { id: "amber", previewClass: "bg-amber-500", glowClass: "shadow-amber-500/50" },
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

function persistPreference(key: string, value: string) {
  window.localStorage.setItem(key, value)
  document.cookie = `${key}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`
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
  const [accent, setAccent] = React.useState<Accent>(() =>
    readStoredValue<Accent>(STORAGE_KEYS.accent, ACCENT_OPTIONS.map((item) => item.id), "emerald")
  )
  const [radius, setRadius] = React.useState<Radius>(() =>
    readStoredValue<Radius>(STORAGE_KEYS.radius, RADIUS_OPTIONS.map((item) => item.id), "default")
  )
  const [motion, setMotion] = React.useState<Motion>(() =>
    readStoredValue<Motion>(STORAGE_KEYS.motion, ["default", "reduced"], "default")
  )
  const [scale, setScale] = React.useState<Scale>(() =>
    readStoredValue<Scale>(STORAGE_KEYS.scale, SCALE_OPTIONS.map((item) => item.id), "md")
  )
  React.useEffect(() => {
    applyAccent(accent)
    applyRadius(radius)
    applyMotion(motion)
    applyScale(scale)
    persistPreference(STORAGE_KEYS.accent, accent)
    persistPreference(STORAGE_KEYS.radius, radius)
    persistPreference(STORAGE_KEYS.motion, motion)
    persistPreference(STORAGE_KEYS.scale, scale)
  }, [accent, motion, radius, scale])

  function onAccentChange(nextAccent: Accent) {
    setAccent(nextAccent)
  }

  function onRadiusChange(nextRadius: Radius) {
    setRadius(nextRadius)
  }

  function onMotionChange(nextMotion: Motion) {
    setMotion(nextMotion)
  }

  function onScaleChange(nextScale: Scale) {
    setScale(nextScale)
  }

  function resetThemePreferences() {
    onAccentChange("emerald")
    onRadiusChange("default")
    onMotionChange("default")
    onScaleChange("md")
    setTheme("system")
  }

  const activeTheme = (theme ?? "system") as ThemeMode
  const currentModeLabel =
    activeTheme === "semi-dark"
      ? "semi dark"
      : activeTheme === "system"
        ? resolvedTheme ?? "system"
        : activeTheme

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

        <div className="flex-1 space-y-4 px-4 pb-4 pt-3">
          <div className="grid grid-cols-2 gap-3 rounded-xl border bg-linear-to-b from-card to-card/40 p-4 shadow-sm">
            <div className="rounded-lg bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">Current mode</p>
              <p className="font-medium capitalize">{currentModeLabel}</p>
            </div>
            <div className="rounded-lg bg-background/70 p-3">
              <p className="text-xs text-muted-foreground">Active accent</p>
              <p className="font-medium capitalize">{accent}</p>
            </div>
          </div>

          <section className="space-y-3 rounded-xl border bg-card/70 p-4 shadow-sm">
            <h3 className="text-sm font-semibold tracking-tight">Appearance mode</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={activeTheme === "light" ? "default" : "outline"}
                size="sm"
                className="justify-start"
                onClick={() => setTheme("light")}
              >
                <Sun className="size-4" />
                Light
              </Button>
              <Button
                variant={activeTheme === "dark" ? "default" : "outline"}
                size="sm"
                className="justify-start"
                onClick={() => setTheme("dark")}
              >
                <Moon className="size-4" />
                Dark
              </Button>
              <Button
                variant={activeTheme === "system" ? "default" : "outline"}
                size="sm"
                className="justify-start"
                onClick={() => setTheme("system")}
              >
                <Monitor className="size-4" />
                System
              </Button>
              <Button
                variant={activeTheme === "semi-dark" ? "default" : "outline"}
                size="sm"
                className="justify-start"
                onClick={() => setTheme("semi-dark")}
              >
                <Moon className="size-4" />
                Semi dark
              </Button>
            </div>
          </section>

          <section className="space-y-3 rounded-xl border bg-card/70 p-4 shadow-sm">
            <h3 className="text-sm font-semibold tracking-tight">Accent palette</h3>
            <div className="grid grid-cols-6 gap-3">
              {ACCENT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-label={`Use ${option.id} accent`}
                  className={cn(
                    "relative flex size-11 items-center justify-center rounded-full border bg-background transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    accent === option.id
                      ? "border-foreground/20 shadow-md ring-2 ring-ring ring-offset-2"
                      : "border-border"
                  )}
                  onClick={() => onAccentChange(option.id)}
                >
                  <span
                    className={cn(
                      "size-7 rounded-full shadow-[0_0_0_1px_hsl(var(--background))]",
                      option.previewClass,
                      option.glowClass
                    )}
                  />
                  {accent === option.id ? (
                    <span className="absolute -right-1.5 -top-1.5 inline-flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                      <Check className="size-3.5" />
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-xl border bg-card/70 p-4 shadow-sm">
            <h3 className="text-sm font-semibold tracking-tight">Corner style</h3>
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

          <section className="space-y-3 rounded-xl border bg-card/70 p-4 shadow-sm">
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

          <section className="space-y-3 rounded-xl border bg-card/70 p-4 shadow-sm">
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

          <div className="rounded-xl border bg-card/70 p-4 shadow-sm">
            <p className="mb-2 text-xs text-muted-foreground">Preview</p>
            <div className="space-y-2 rounded-lg border bg-background p-3">
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

          <Button
            type="button"
            variant="outline"
            className="h-10 w-full rounded-xl border-dashed"
            onClick={resetThemePreferences}
          >
            <Sparkles className="size-4" />
            Reset to recommended defaults
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
