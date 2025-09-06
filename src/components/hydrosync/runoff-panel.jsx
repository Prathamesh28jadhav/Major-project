"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RunoffPanel({ coefficients }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">Runoff Coefficients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {coefficients.map((c) => (
            <div key={c.soil} className="flex items-center justify-between">
              <span className="text-muted-foreground">{c.soil}</span>
              <span className="font-medium">{c.coefficient}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Used in hydrological calculations to estimate runoff from rainfall based on soil/land cover.
        </p>
      </CardContent>
    </Card>
  )
}
