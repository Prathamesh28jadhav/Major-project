"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DamsSummary({ dams }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {dams.map((d) => {
        const pct = Math.round((d.levelMm3 / d.capacityMm3) * 100)
        const statusColor =
          d.status === "Releasing"
            ? "text-amber-500"
            : d.status === "Rising"
              ? "text-emerald-500"
              : "text-muted-foreground"
        return (
          <Card key={d.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-pretty text-base">{d.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 items-end">
              <div>
                <div className="text-sm text-muted-foreground">Level</div>
                <div className="text-2xl font-semibold">{pct}%</div>
                <div className="text-xs text-muted-foreground">
                  {d.levelMm3} / {d.capacityMm3} Mm³
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Flow</div>
                <div className="text-sm">In {d.inflowM3s} m³/s</div>
                <div className="text-sm">Out {d.outflowM3s} m³/s</div>
              </div>
              <div className={`col-span-2 text-xs ${statusColor}`}>
                Status: {d.status} • Rain 24h: {d.rainfall24hMm} mm
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
