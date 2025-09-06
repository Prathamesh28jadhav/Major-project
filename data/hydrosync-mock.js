export const dams = [
  {
    id: "dam-a",
    name: "Kalyani Dam",
    capacityMm3: 420,
    levelMm3: 278,
    inflowM3s: 85,
    outflowM3s: 62,
    rainfall24hMm: 18,
    status: "Stable",
  },
  {
    id: "dam-b",
    name: "Bhavani Sagar",
    capacityMm3: 930,
    levelMm3: 712,
    inflowM3s: 156,
    outflowM3s: 180,
    rainfall24hMm: 8,
    status: "Releasing",
  },
  {
    id: "dam-c",
    name: "Mettur Dam",
    capacityMm3: 264,
    levelMm3: 198,
    inflowM3s: 54,
    outflowM3s: 49,
    rainfall24hMm: 25,
    status: "Rising",
  },
]

export const levelSeries = [
  { date: "2025-08-25", level: 255, inflow: 70, outflow: 60, rainfall: 12 },
  { date: "2025-08-26", level: 260, inflow: 75, outflow: 58, rainfall: 10 },
  { date: "2025-08-27", level: 268, inflow: 80, outflow: 59, rainfall: 14 },
  { date: "2025-08-28", level: 272, inflow: 83, outflow: 60, rainfall: 16 },
  { date: "2025-08-29", level: 275, inflow: 86, outflow: 61, rainfall: 18 },
  { date: "2025-08-30", level: 276, inflow: 85, outflow: 62, rainfall: 11 },
  { date: "2025-08-31", level: 278, inflow: 85, outflow: 62, rainfall: 9 },
]

export const forecast = [
  { date: "2025-09-01", level: 281, rainfall: 10, risk: "Low" },
  { date: "2025-09-02", level: 284, rainfall: 14, risk: "Low" },
  { date: "2025-09-03", level: 288, rainfall: 22, risk: "Medium" },
  { date: "2025-09-04", level: 293, rainfall: 26, risk: "Medium" },
  { date: "2025-09-05", level: 300, rainfall: 32, risk: "High" },
]

export const alerts = [
  {
    id: 1,
    damId: "dam-b",
    severity: "warning",
    message: "Outflow exceeds inflow for 6h. Review irrigation schedules.",
    time: "10m ago",
  },
  {
    id: 2,
    damId: "dam-c",
    severity: "info",
    message: "Rainfall spike detected in catchment. Monitoring runoff.",
    time: "1h ago",
  },
  {
    id: 3,
    damId: "dam-a",
    severity: "critical",
    message: "Predicted level > 95% capacity in 72h if rainfall persists.",
    time: "3h ago",
  },
]

export const runoffCoefficients = [
  { soil: "Sandy", coefficient: 0.1 },
  { soil: "Loamy", coefficient: 0.25 },
  { soil: "Clayey", coefficient: 0.45 },
  { soil: "Urban (paved)", coefficient: 0.8 },
]
