"use client"

import { Dna, FlaskConical, Microscope } from "lucide-react"

interface NavbarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "masked", label: "Masked SMILES Predictor", icon: Microscope },
  { id: "molecular", label: "Molecular Property Predictor", icon: FlaskConical },
]

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Dna className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            DrugSeek <span className="text-primary">AI</span>
          </span>
        </div>

        <nav className="flex items-center gap-1 rounded-lg border border-border bg-secondary/50 p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
