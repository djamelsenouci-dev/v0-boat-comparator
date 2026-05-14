"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Anchor, Users, Ruler, Gauge, Check, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Boat } from "./boat-card"

interface ComparisonPanelProps {
  boats: Boat[]
  onRemove: (boat: Boat) => void
  onClose: () => void
}

export function ComparisonPanel({ boats, onRemove, onClose }: ComparisonPanelProps) {
  if (boats.length === 0) return null

  const specs = [
    { key: "price", label: "Prix / jour", icon: null, format: (v: number) => `${v.toLocaleString()}€` },
    { key: "length", label: "Longueur", icon: Ruler, format: (v: number) => `${v}m` },
    { key: "capacity", label: "Capacité", icon: Users, format: (v: number) => `${v} pers.` },
    { key: "speed", label: "Vitesse max", icon: Gauge, format: (v: number) => `${v} kn` },
    { key: "year", label: "Année", icon: Anchor, format: (v: number) => v.toString() },
  ]

  const allFeatures = [...new Set(boats.flatMap(b => b.features))]

  const getBestValue = (key: string) => {
    if (key === "price") {
      return Math.min(...boats.map(b => b[key as keyof Boat] as number))
    }
    return Math.max(...boats.map(b => b[key as keyof Boat] as number))
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <Card className="mx-auto max-w-6xl border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl shadow-primary/10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Anchor className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Comparaison</h3>
                <p className="text-sm text-muted-foreground">{boats.length} bateau{boats.length > 1 ? "x" : ""} sélectionné{boats.length > 1 ? "s" : ""}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Comparison grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px] p-4">
              {/* Boat headers */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `150px repeat(${boats.length}, 1fr)` }}>
                <div />
                {boats.map((boat) => (
                  <motion.div
                    key={boat.id}
                    layout
                    className="relative"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${boat.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <button
                        onClick={() => onRemove(boat)}
                        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive/80 text-destructive-foreground hover:bg-destructive transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-sm font-semibold text-foreground truncate">{boat.name}</p>
                        <Badge className="mt-1 bg-primary/80 text-xs">{boat.type}</Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Specs rows */}
              <div className="mt-4 space-y-2">
                {specs.map((spec) => {
                  const bestValue = getBestValue(spec.key)
                  return (
                    <div
                      key={spec.key}
                      className="grid gap-4 items-center py-2 border-b border-border/30"
                      style={{ gridTemplateColumns: `150px repeat(${boats.length}, 1fr)` }}
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {spec.icon && <spec.icon className="h-4 w-4" />}
                        <span>{spec.label}</span>
                      </div>
                      {boats.map((boat) => {
                        const value = boat[spec.key as keyof Boat] as number
                        const isBest = value === bestValue && boats.length > 1
                        return (
                          <div
                            key={boat.id}
                            className={`text-center text-sm font-medium ${
                              isBest ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {spec.format(value)}
                            {isBest && (
                              <span className="ml-1 text-xs text-primary">★</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}

                {/* Features comparison */}
                <div className="pt-3">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Équipements</p>
                  {allFeatures.slice(0, 6).map((feature) => (
                    <div
                      key={feature}
                      className="grid gap-4 items-center py-1.5"
                      style={{ gridTemplateColumns: `150px repeat(${boats.length}, 1fr)` }}
                    >
                      <span className="text-xs text-muted-foreground truncate">{feature}</span>
                      {boats.map((boat) => (
                        <div key={boat.id} className="flex justify-center">
                          {boat.features.includes(feature) ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Minus className="h-4 w-4 text-muted-foreground/50" />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-border/50 p-4">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Demander un devis
            </Button>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
