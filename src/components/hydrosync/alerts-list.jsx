"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function SeverityDot({ severity }) {
  const color = severity === "critical" ? "bg-red-500" : severity === "warning" ? "bg-amber-500" : "bg-blue-500"
  return <span className={`inline-block w-2 h-2 rounded-full ${color}`} aria-hidden />
}

export default function AlertsList({ alerts, dams }) {
  const damName = (id) => dams.find((d) => d.id === id)?.name || id
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((a) => (
          <div key={a.id} className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm">
                <SeverityDot severity={a.severity} />
                <span className="font-medium">{damName(a.damId)}</span>
                <span className="text-xs text-muted-foreground">• {a.time}</span>
              </div>
              <div className="text-sm text-muted-foreground">{a.message}</div>
            </div>
            <button className="text-xs text-primary hover:underline">Acknowledge</button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
