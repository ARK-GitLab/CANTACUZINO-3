import { Suspense } from 'react'
import { AccommodationBookingComponent } from '@/components/accommodation-booking'

export default function AccommodationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccommodationBookingComponent />
    </Suspense>
  )
} 