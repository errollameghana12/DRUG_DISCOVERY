"use client"

import { useState, useCallback } from "react"
import { FlaskConical, Beaker } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface MoleculeResult {
  id: number
  smiles: string
  pIC50: number
  logP: number
}

interface MolecularPredictorProps {
  inputValue: string
  onInputChange: (value: string) => void
}

export function MolecularPredictor({ inputValue, onInputChange }: MolecularPredictorProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<MoleculeResult[]>([])

  const handleAnalyze = useCallback(async () => {
    if (!inputValue.trim()) {
      toast.error("Please enter a SMILES string")
      return
    }

    setIsLoading(true)
    setResults([])

    // Simulate AI processing (1.5 seconds as specified)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate 5 similar SMILES variations with properties
    const mockResults: MoleculeResult[] = [
      { id: 1, smiles: "CCOc1ccccc1", pIC50: 7.55, logP: 3.2 },
      { id: 2, smiles: "CCOC(=O)C1", pIC50: 6.72, logP: 2.9 },
      { id: 3, smiles: "CCOS(=O)(=O)", pIC50: 6.62, logP: 3.4 },
      { id: 4, smiles: "CCOc1ccc(O)cc1", pIC50: 5.81, logP: 2.7 },
      { id: 5, smiles: "CCOC(C)=O", pIC50: 5.55, logP: 3.1 },
    ]

    setResults(mockResults)
    setIsLoading(false)
    toast.success("Analysis complete!")
  }, [inputValue])

  // Find the highest pIC50 for highlighting
  const maxPIC50 = results.length > 0 ? Math.max(...results.map(r => r.pIC50)) : 0

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FlaskConical className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Molecular Property Predictor</CardTitle>
            <CardDescription>
              Predict pIC50 and LogP values for a molecule
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">Enter SMILES String</label>
          <Input
            placeholder="Enter SMILES (e.g., CCO)"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            className="font-mono text-base"
          />
        </div>

        <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Analyzing...
            </>
          ) : (
            <>
              <Beaker className="mr-2 h-4 w-4" />
              Analyze Molecule
            </>
          )}
        </Button>

        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}

        {results.length > 0 && !isLoading && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-muted-foreground">
                Predicted Properties
              </h4>
              <Badge variant="outline" className="text-xs">
                AI Generated Results
              </Badge>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="w-12 text-center">#</TableHead>
                    <TableHead>SMILES</TableHead>
                    <TableHead className="w-24 text-right">pIC50</TableHead>
                    <TableHead className="w-24 text-right">LogP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => {
                    const isHighest = result.pIC50 === maxPIC50
                    return (
                      <TableRow 
                        key={result.id}
                        className={isHighest ? "bg-primary/5" : ""}
                      >
                        <TableCell className="text-center">
                          <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium ${
                            isHighest 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-secondary text-muted-foreground"
                          }`}>
                            {result.id}
                          </span>
                        </TableCell>
                        <TableCell className={`font-mono text-sm ${
                          isHighest ? "text-primary font-semibold" : ""
                        }`}>
                          {result.smiles}
                        </TableCell>
                        <TableCell className={`text-right font-mono font-semibold ${
                          isHighest ? "text-primary" : ""
                        }`}>
                          {result.pIC50.toFixed(2)}
                        </TableCell>
                        <TableCell className={`text-right font-mono ${
                          isHighest ? "text-primary" : "text-muted-foreground"
                        }`}>
                          {result.logP.toFixed(1)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
