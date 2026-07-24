"use client"

import { useState, useCallback } from "react"
import { Microscope, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Prediction {
  smiles: string
  probability: number
}

interface MaskedSmilesProps {
  inputValue: string
  onInputChange: (value: string) => void
}

export function MaskedSmiles({ inputValue, onInputChange }: MaskedSmilesProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [predictions, setPredictions] = useState<Prediction[]>([])

  const handlePredict = useCallback(async () => {
    if (!inputValue.trim()) {
      toast.error("Please enter a SMILES string with <mask>")
      return
    }

    if (!inputValue.includes("<mask>")) {
      toast.error("SMILES must contain a <mask> token")
      return
    }

    setIsLoading(true)
    setPredictions([])

    // Simulate AI processing (1.5 seconds as specified)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate mock predictions based on input
    const baseSmiles = inputValue.replace("<mask>", "")
    const replacements = ["C", "N", "O", "Cl", "Br"]
    const probabilities = [0.82, 0.74, 0.65, 0.59, 0.52]

    const mockPredictions: Prediction[] = replacements.map((replacement, index) => ({
      smiles: baseSmiles + replacement,
      probability: probabilities[index],
    }))

    setPredictions(mockPredictions)
    setIsLoading(false)
    toast.success("Prediction complete!")
  }, [inputValue])

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Microscope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Masked SMILES Predictor (ChemBERTa)</CardTitle>
            <CardDescription>
              Predict missing atoms in a SMILES string using AI
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">
            Enter SMILES with {"<mask>"} token
          </label>
          <Input
            placeholder="CCO<mask>"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            className="font-mono text-base"
          />
        </div>

        <Button onClick={handlePredict} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Predicting...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Predict
            </>
          )}
        </Button>

        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-3">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        )}

        {predictions.length > 0 && !isLoading && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">
                Top 5 Predictions
              </h4>
              <Badge variant="outline" className="text-xs">
                AI Generated Results
              </Badge>
            </div>
            <div className="space-y-2">
              {predictions.map((pred, index) => (
                <div
                  key={pred.smiles}
                  className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${
                    index === 0
                      ? "border-primary bg-primary/5"
                      : "border-border bg-secondary/30"
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <span className={`font-mono text-base ${
                      index === 0 ? "text-primary font-semibold" : "text-foreground"
                    }`}>
                      {pred.smiles}
                    </span>
                  </div>
                  <div className={`font-mono text-sm font-semibold ${
                    index === 0 ? "text-primary" : "text-muted-foreground"
                  }`}>
                    ({pred.probability.toFixed(2)})
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
