"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function RiskBadge({ risk }) {
  const color =
    risk === "High"
      ? "bg-red-500/15 text-red-600"
      : risk === "Medium"
        ? "bg-amber-500/15 text-amber-600"
        : "bg-emerald-500/15 text-emerald-600"
  return <span className={`text-xs px-2 py-0.5 rounded ${color}`}>{risk} risk</span>
}

export default function ForecastPanel({ forecast }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {forecast.map((d) => (
          <div key={d.date} className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground">{d.date}</div>
            <div className="flex items-center gap-3">
              <div>
                Level: <span className="font-medium">{d.level} Mm³</span>
              </div>
              <div>
                Rain: <span className="font-medium">{d.rainfall} mm</span>
              </div>
              <RiskBadge risk={d.risk} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
