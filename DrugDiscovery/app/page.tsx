"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { MolecularPredictor } from "@/components/molecular-predictor"
import { MaskedSmiles } from "@/components/masked-smiles"
import { Dna } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("masked")
  
  // Maintain input values when switching between features
  const [maskedInput, setMaskedInput] = useState("")
  const [molecularInput, setMolecularInput] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Dna className="h-4 w-4" />
            AI-Powered Drug Discovery Platform
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Accelerate Your{" "}
            <span className="text-primary">Drug Discovery</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
            Harness the power of artificial intelligence to predict molecular
            properties and discover potential drug candidates faster.
          </p>
        </div>

        {/* Feature Cards - Smooth transition */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "masked" && (
            <MaskedSmiles 
              inputValue={maskedInput} 
              onInputChange={setMaskedInput} 
            />
          )}
          {activeTab === "molecular" && (
            <MolecularPredictor 
              inputValue={molecularInput} 
              onInputChange={setMolecularInput} 
            />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Dna className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">
                DrugSeek <span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for hackathon demonstration. All predictions use mock data.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
