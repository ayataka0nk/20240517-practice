import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import React from 'react'

startTransition(() => {
  hydrateRoot(
    document.querySelector('#app'),
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  )
})
