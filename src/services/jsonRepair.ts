/**
 * Robust JSON extraction from AI responses.
 * Handles markdown wrapping, unescaped characters, and other common issues.
 */
export function extractAndParseJSON(raw: string): Record<string, unknown> {
  let text = raw.trim()

  // 1. Strip markdown code fences
  text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()

  // 2. Try direct parse first
  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    // continue
  }

  // 3. Try to extract the outermost JSON object
  const firstBrace = text.indexOf('{')
  const lastBrace = text.lastIndexOf('}')
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const extracted = text.slice(firstBrace, lastBrace + 1)
    try {
      return JSON.parse(extracted) as Record<string, unknown>
    } catch {
      // continue
    }
  }

  // 4. Try to repair common JSON issues
  let repaired = text
    // Fix trailing commas before } or ]
    .replace(/,(\s*[}\]])/g, '$1')
    // Fix unescaped newlines in strings (brutal but effective for AI output)
    .replace(/(?<!\\)\\(?!["\\\/bfnrtu])/g, '\\\\')

  try {
    return JSON.parse(repaired) as Record<string, unknown>
  } catch {
    // continue
  }

  // 5. Last resort: try to salvage from extracted content
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const extracted = text.slice(firstBrace, lastBrace + 1)
    const cleanedExtract = extracted
      .replace(/,(\s*[}\]])/g, '$1')
    try {
      return JSON.parse(cleanedExtract) as Record<string, unknown>
    } catch {
      // give up
    }
  }

  // 6. All attempts failed — show a helpful error
  const snippet = text.length > 200 ? text.slice(0, 200) + '...' : text
  throw new Error(
    `AIの応答を解析できませんでした。もう一度「漫画の台本を生成する」を押してみてください。\n（応答の冒頭: ${snippet}）`
  )
}
