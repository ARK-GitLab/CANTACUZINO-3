import { Suspense } from 'react'
import { VisitingProgramComponent } from '@/components/visiting-program'

export default function VisitingProgramPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VisitingProgramComponent />
    </Suspense>
  )
} 