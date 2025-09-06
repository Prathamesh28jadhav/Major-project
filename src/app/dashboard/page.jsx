import DashboardPageLayout from "@/components/dashboard/layout"
import BracketsIcon from "@/components/icons/brackets"
import DamLevelChart from "@/components/hydrosync/dam-level-chart"
import RainfallChart from "@/components/hydrosync/rainfall-chart"
import ForecastPanel from "@/components/hydrosync/forecast-panel"
import AlertsList from "@/components/hydrosync/alerts-list"
import DamOverview from "@/components/hydrosync/dam-overview"
import { dams, levelSeries, forecast, alerts } from "../../../data/hydrosync-mock"

export default function DashboardOverview() {
    return (
        <DashboardPageLayout
            header={{
                title: "HydroSync_AI Overview",
                description: "Dam levels, inflow/outflow, rainfall and forecast",
                icon: BracketsIcon,
            }}
        >
            <div className="grid grid-cols-1 gap-6 mb-6">
                <DamOverview dams={dams} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <DamLevelChart data={levelSeries} />
                <RainfallChart data={levelSeries} />
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
                <ForecastPanel forecast={forecast} />
                <AlertsList alerts={alerts} dams={dams} />
            </div>
        </DashboardPageLayout>
    )
}
