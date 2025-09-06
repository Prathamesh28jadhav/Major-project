"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function RiskBadge({ risk }) {
  const styles =
    risk === "High"
      ? "bg-red-500/15 text-red-600"
      : risk === "Medium"
        ? "bg-amber-500/15 text-amber-600"
        : "bg-emerald-500/15 text-emerald-600"
  return <span className={`text-xs px-2 py-0.5 rounded ${styles}`}>{risk} risk</span>
}

export default function DamOverview({ dams }) {
  const [selectedDamId, setSelectedDamId] = useState(dams?.[0]?.id || "")
  const selectedDam = useMemo(() => dams.find((d) => d.id === selectedDamId) || dams[0], [dams, selectedDamId])

  const pct = selectedDam ? Math.round((selectedDam.levelMm3 / selectedDam.capacityMm3) * 100) : 0

  // Simple heuristic to estimate current risk from level and flow deltas
  const risk = useMemo(() => {
    if (!selectedDam) return "Low"
    const levelPct = (selectedDam.levelMm3 / selectedDam.capacityMm3) * 100
    const delta = (selectedDam.inflowM3s || 0) - (selectedDam.outflowM3s || 0)
    if (levelPct >= 95 || delta >= 50) return "High"
    if (levelPct >= 85 || delta >= 20) return "Medium"
    return "Low"
  }, [selectedDam])

  return (
    <div className="space-y-4">
      {/* Selector */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-muted-foreground">Select Dam</div>
          <div className="text-base font-medium">{selectedDam?.name || "—"}</div>
        </div>
        <label className="sr-only" htmlFor="dam-select">
          Choose dam
        </label>
        <select
          id="dam-select"
          className="border rounded-md px-2 py-1 text-sm bg-background"
          value={selectedDamId}
          onChange={(e) => setSelectedDamId(e.target.value)}
        >
          {dams.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* 3-box overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Water Level */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-pretty text-base">Water Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{pct}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              {selectedDam?.levelMm3} / {selectedDam?.capacityMm3} Mm³
            </div>
            <div className="text-xs text-muted-foreground mt-2">Status: {selectedDam?.status}</div>
          </CardContent>
        </Card>

        {/* Risk */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-pretty text-base">Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <RiskBadge risk={risk} />
              <span className="text-sm text-muted-foreground">
                {risk === "High"
                  ? "Near capacity or inflow surge"
                  : risk === "Medium"
                    ? "Elevated level/flow delta"
                    : "Normal operating conditions"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Flow */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-pretty text-base">Flow</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-muted-foreground">Inflow</div>
              <div className="text-lg font-medium">{selectedDam?.inflowM3s} m³/s</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Outflow</div>
              <div className="text-lg font-medium">{selectedDam?.outflowM3s} m³/s</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
