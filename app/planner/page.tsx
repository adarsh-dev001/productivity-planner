import { PlannerView } from '@/components/planner/planner-view'
import { PlannerHeader } from '@/components/planner/planner-header'

export default function PlannerPage() {
  return (
    <div className="container py-6 space-y-8">
      <PlannerHeader />
      <PlannerView />
    </div>
  )
}