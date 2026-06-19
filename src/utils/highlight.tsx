/**
 * Highlights matching text in a string by wrapping matches with highlight tags
 */
export function highlightText(text: string, query: string): (string | JSX.Element)[] {
  if (!query.trim()) return [text]

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const parts: (string | JSX.Element)[] = []
  let lastIndex = 0

  let index = lowerText.indexOf(lowerQuery)
  while (index !== -1) {
    // Add text before the match
    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index))
    }

    // Add highlighted match
    parts.push(
      <span key={`${index}-match`} className="bg-yellow-500/30 text-yellow-100 font-medium">
        {text.slice(index, index + query.length)}
      </span>
    )

    lastIndex = index + query.length
    index = lowerText.indexOf(lowerQuery, lastIndex)
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length === 0 ? [text] : parts
}
