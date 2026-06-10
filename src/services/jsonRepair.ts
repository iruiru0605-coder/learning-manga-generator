/**
 * Robust JSON extraction from AI responses.
 * Handles markdown wrapping, unescaped characters, and other common issues.
 */
export function extractAndParseJSON(raw: string): Record<string, unknown> {
  let text = raw.trim()

  // 1. Strip markdown code fences
  text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()

  const parseErrors: string[] = []

  // Helper to try parse and record error
  const tryParse = (input: string, label: string): Record<string, unknown> | null => {
    try {
      return JSON.parse(input) as Record<string, unknown>
    } catch (e) {
      parseErrors.push(`${label}: ${e instanceof Error ? e.message : String(e)}`)
      return null
    }
  }

  // 2. Try direct parse
  const direct = tryParse(text, '直接パース')
  if (direct) return direct

  // 3. Extract outermost JSON object/array
  const firstBrace = text.indexOf('{')
  const lastBrace = text.lastIndexOf('}')
  const firstBracket = text.indexOf('[')
  const lastBracket = text.lastIndexOf(']')

  const hasObject = firstBrace !== -1 && lastBrace > firstBrace
  const hasArray = firstBracket !== -1 && lastBracket > firstBracket

  if (hasObject) {
    const extracted = text.slice(firstBrace, lastBrace + 1)
    const r = tryParse(extracted, '波括弧抽出')
    if (r) return r
  }

  if (hasArray) {
    const extracted = text.slice(firstBracket, lastBracket + 1)
    const r = tryParse(extracted, '角括弧抽出')
    if (r) return r
  }

  // 4. Fix trailing commas
  {
    let repaired = text.replace(/,(\s*[}\]])/g, '$1')
    const r = tryParse(repaired, '末尾カンマ修正')
    if (r) return r
  }

  // 5. Fix unescaped newlines in string values
  {
    const repaired = fixStringNewlines(text)
    const r = tryParse(repaired, '文字列内改行修正')
    if (r) return r
  }

  // 6. Combined fixes on extracted object
  if (hasObject) {
    let extracted = text.slice(firstBrace, lastBrace + 1)
    extracted = extracted.replace(/,(\s*[}\]])/g, '$1')
    extracted = fixStringNewlines(extracted)
    const r = tryParse(extracted, '複合修正（波括弧）')
    if (r) return r
  }

  if (hasArray) {
    let extracted = text.slice(firstBracket, lastBracket + 1)
    extracted = extracted.replace(/,(\s*[}\]])/g, '$1')
    extracted = fixStringNewlines(extracted)
    const r = tryParse(extracted, '複合修正（角括弧）')
    if (r) return r
  }

  // 7. Show detailed error
  const snippet = text.length > 300 ? text.slice(0, 300) + '...' : text
  const lastErrors = parseErrors.slice(-3).join('\n')
  throw new Error(
    `AIの応答を解析できませんでした。\n内部エラー:\n${lastErrors}\n\n応答の冒頭: ${snippet}`
  )
}

/**
 * Fix unescaped newlines and tabs inside JSON string values.
 * JSON strings must use \n and \t, not literal whitespace characters.
 */
function fixStringNewlines(text: string): string {
  // Track whether we're inside a string
  let result = ''
  let inString = false
  let escaped = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]

    if (escaped) {
      result += ch
      escaped = false
      continue
    }

    if (ch === '\\' && inString) {
      escaped = true
      result += ch
      continue
    }

    if (ch === '"' && !escaped) {
      inString = !inString
      result += ch
      continue
    }

    if (inString && ch === '\n') {
      result += '\\n'
      continue
    }

    if (inString && ch === '\t') {
      result += '\\t'
      continue
    }

    if (inString && ch === '\r') {
      // skip \r
      continue
    }

    result += ch
  }

  return result
}
