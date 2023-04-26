import React from 'react'
import { FallbackProps } from 'react-error-boundary'

export default function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role="alert">
      <p>Failed to load users:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}
