import { useState, useCallback } from 'react'

export function useCopyToClipboard() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copy = useCallback(async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }, [])

  return { copiedId, copy }
}
