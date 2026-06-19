import { useEffect, useRef } from 'react'

/**
 * Custom hook for debouncing a callback function.
 * Delays execution until the specified delay has passed without new invocations.
 *
 * @param callback - Function to debounce
 * @param delay - Delay in milliseconds (default: 300)
 * @param dependencies - Dependencies array (similar to useEffect)
 */
export function useDebounce(
  callback: () => void,
  delay: number = 300,
  dependencies: React.DependencyList = []
) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Clear any pending timeout at the start of a new effect
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Schedule the callback after the specified delay
    timeoutRef.current = setTimeout(() => {
      callback()
    }, delay)

    // Cleanup: clear the timeout on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, dependencies)
}
