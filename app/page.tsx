import { DesktopApp } from '@/components/desktop-app'
import { useEffect } from 'react'

export default function HomePage() {
  const isBrowser = typeof window !== 'undefined'

  useEffect(() => {
    if (isBrowser) {
      // Your window-dependent code here
    }
  }, [])

  return <DesktopApp />
}
