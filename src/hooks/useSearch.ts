import { useState, useEffect, useRef } from 'react'
import type { Item } from '../types'
import { searchItems } from '../services/mockApi'
import { useDebounce } from './useDebounce'

export interface UseSearchReturn {
  query: string
  setQuery: (q: string) => void
  results: Item[]
  isLoading: boolean
  error: string | null
}

export function useSearch(): UseSearchReturn {
  // Initialize query from URL parameter (?q=...)
  const [query, setQueryState] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('q') || ''
  })
  const [results, setResults] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cancelledRef = useRef(false)

  // Persist query to URL when it changes
  const setQuery = (q: string) => {
    setQueryState(q)
    // Update URL without full page reload
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    window.history.replaceState({}, '', `?${params.toString()}`)
  }

  // Debounced search function
  const performSearch = () => {
    // Mark previous request as cancelled
    cancelledRef.current = true

    // If query is empty, clear results and don't search
    if (query.length === 0) {
      setResults([])
      setError(null)
      return
    }

    // Reset cancelled flag for this new request
    cancelledRef.current = false

    // Set loading state before making the request
    setIsLoading(true)

    // Make the async search request
    searchItems(query)
      .then(results => {
        // Guard: only update state if this request wasn't cancelled
        if (!cancelledRef.current) {
          setIsLoading(false)
          setResults(results)
          setError(null)
        }
      })
      .catch(err => {
        // Guard: only update state if this request wasn't cancelled
        if (!cancelledRef.current) {
          setIsLoading(false)
          setError(err instanceof Error ? err.message : 'Search failed')
          setResults([])
        }
      })
  }

  // Use the debounce hook for search - only depends on query, not isLoading
  // isLoading shouldn't trigger a new debounce cycle
  useDebounce(performSearch, 300, [query])

  return { query, setQuery, results, isLoading, error }
}
