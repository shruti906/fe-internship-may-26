# Frontend Tools Search

A minimal React app for searching a curated list of frontend frameworks, libraries, and tools. Features debounced search, text highlighting, URL persistence, and enhanced keyboard shortcuts.

---

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Implementation Status ✅ COMPLETE

All core requirements and bonus features have been fully implemented and tested.

---

## Implementation Details

### Core Task - `useSearch` Hook (`src/hooks/useSearch.ts`)

✅ **1. Debounced Search (300ms)**
- Waits 300ms after user stops typing before issuing search request
- Cancels pending timers when new keystroke arrives
- Implemented with custom `useDebounce` hook for reusability

✅ **2. Async Search**
- Calls `searchItems(query)` from `src/services/mockApi.ts`
- Shows loading skeleton while request is in flight
- Handles errors gracefully with error display
- Clears results when query is empty

✅ **3. Stale-Response Prevention**
- Uses `cancelledRef` to mark previous requests as stale
- Newer responses always win; old responses are discarded
- Prevents race conditions when user types rapidly

✅ **4. Cleanup on Unmount**
- `useDebounce` hook properly cleans up timers on unmount
- No dangling state updates or memory leaks

✅ **5. App.tsx Conditional Rendering**
- Shows `<LoadingState />` while loading
- Shows `<ItemList items={results} query={query} />` when results exist
- Shows `<EmptyState query={query} />` when no results found
- Shows error banner when errors occur

### Bonus Features ✅ ALL COMPLETED

✅ **Text Highlighting in Results**
- Matching text highlighted in yellow in both item name and description
- Case-insensitive highlighting utility (`src/utils/highlight.tsx`)
- Updated ItemCard to accept and display query for highlighting

✅ **Reusable `useDebounce` Custom Hook**
- Created `src/hooks/useDebounce.ts` for generic debounce logic
- Configurable delay (default 300ms)
- Proper cleanup on unmount
- Refactored useSearch to use this hook

✅ **Enhanced Keyboard Shortcuts**
- `/` - Focus search input (original)
- `Ctrl+K` / `Cmd+K` - Focus search input (new, common convention)
- `Escape` - Blur search input
- UI shows keyboard hint (`⌘K` or `↵` based on context)

✅ **Persist Query in URL**
- Search query saved as URL parameter: `?q=search`
- Survives page refreshes - search is preserved
- Uses `history.replaceState()` for clean URL history
- Loads initial query from URL on page load

---

## Files Created/Modified

### New Files Created
- `src/hooks/useDebounce.ts` - Reusable debounce hook
- `src/utils/highlight.tsx` - Text highlighting utility

### Files Modified
- `src/hooks/useSearch.ts` - Complete implementation with debounce, async search, stale prevention, URL persistence
- `src/components/ItemCard.tsx` - Added query prop for text highlighting
- `src/components/ItemList.tsx` - Added query prop pass-through
- `src/components/SearchInput.tsx` - Enhanced with Ctrl+K shortcut and keyboard hints
- `src/App.tsx` - Added conditional rendering and query prop passing

### Unchanged (Complete)
- `src/components/LoadingState.tsx`
- `src/components/EmptyState.tsx`
- `src/services/mockApi.ts`
- `src/types/index.ts`
- All config files (tsconfig, vite, tailwind, etc.)

---

## Features

- **Real-time Search**: Debounced 300ms for optimal performance
- **Text Highlighting**: Matching search terms highlighted in yellow
- **URL Persistence**: Search query saved in URL for bookmarking/sharing
- **Loading States**: Animated skeleton loaders during search
- **Error Handling**: Graceful error display
- **Stale Prevention**: Old API responses never override newer ones
- **Keyboard Shortcuts**:
  - `/` - Focus search
  - `Ctrl+K` / `Cmd+K` - Focus search
  - `Escape` - Blur search
- **Responsive UI**: Works on all screen sizes with TailwindCSS

---

## Tech Stack

- React 18 with TypeScript
- Vite (fast dev server)
- TailwindCSS (styling)
- Custom React hooks (useSearch, useDebounce)

---

## Testing

All features have been tested and verified:
- ✅ Debounce works correctly (300ms delay)
- ✅ Loading state shows during search
- ✅ Stale responses are discarded
- ✅ Text highlighting appears in results
- ✅ URL persistence survives page refresh
- ✅ Keyboard shortcuts function properly
- ✅ No React errors or warnings

```
src/
  components/
    SearchInput.tsx    <- complete
    ItemCard.tsx       <- complete
    ItemList.tsx       <- complete
    LoadingState.tsx   <- complete
    EmptyState.tsx     <- complete
  hooks/
    useSearch.ts       <- YOUR TASK
  services/
    mockApi.ts         <- complete (mock, variable delay)
  types/
    index.ts           <- type definitions
  App.tsx              <- one small TODO (conditional rendering)
```

---

## Evaluation

| Area | What we look for |
|---|---|
| Debounce | Correct timer cleanup, no leaks |
| Async handling | Loading state, error handling |
| Stale prevention | Old responses never win over newer ones |
| Cleanup | No updates after unmount |
| Code quality | Readable, no unnecessary abstractions |
