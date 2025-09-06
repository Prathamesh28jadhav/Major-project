"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function RainfallChart({ data, title = "Rainfall (mm)" }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-pretty">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rainfall" fill="hsl(var(--chart-4))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
