"use client"

import { motion } from "framer-motion"
import { Anchor, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 border-b border-border/30 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <Anchor className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">MedBoats</h1>
              <p className="text-xs text-muted-foreground">Méditerranée</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm text-foreground hover:text-primary transition-colors">
              Accueil
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Destinations
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Types de bateaux
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              À propos
            </a>
          </nav>

          {/* Search and CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="w-48 pl-9 bg-secondary/50 border-border/50 focus:border-primary"
              />
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Réserver
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/30 py-4"
          >
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-sm text-foreground">Accueil</a>
              <a href="#" className="text-sm text-muted-foreground">Destinations</a>
              <a href="#" className="text-sm text-muted-foreground">Types de bateaux</a>
              <a href="#" className="text-sm text-muted-foreground">À propos</a>
              <div className="pt-4 border-t border-border/30">
                <Button className="w-full bg-primary text-primary-foreground">
                  Réserver
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
