"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, Line } from "recharts"

export default function DamLevelChart({ data, title = "Reservoir Level (Mm³) & Flow (m³/s)" }) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-pretty">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <defs>
              <linearGradient id="levelFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" label={{ value: "Mm³", angle: -90, position: "insideLeft" }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: "m³/s", angle: 90, position: "insideRight" }} />
            <Tooltip />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="level"
              stroke="hsl(var(--primary))"
              fill="url(#levelFill)"
              name="Level (Mm³)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="inflow"
              stroke="hsl(var(--chart-2))"
              dot={false}
              name="Inflow (m³/s)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="outflow"
              stroke="hsl(var(--chart-3))"
              dot={false}
              name="Outflow (m³/s)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
