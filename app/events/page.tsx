import { Suspense } from 'react'
import { EventBookingComponent } from '@/components/event-booking'

export default function EventsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventBookingComponent />
    </Suspense>
  )
} 