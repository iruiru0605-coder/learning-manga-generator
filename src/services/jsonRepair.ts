/**
 * Robust JSON extraction from AI responses.
 * Handles markdown wrapping, unescaped characters, and other common issues.
 */
export function extractAndParseJSON(raw: string): Record<string, unknown> {
  let text = raw.trim()

  // 1. Strip markdown code fences
  text = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()

  const parseErrors: string[] = []

  const tryParse = (input: string, label: string): Record<string, unknown> | null => {
    try {
      return JSON.parse(input) as Record<string, unknown>
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      const posMatch = msg.match(/position (\d+)/)
      let ctx = ''
      if (posMatch) {
        const pos = parseInt(posMatch[1])
        ctx = input.slice(Math.max(0, pos - 40), pos + 40)
      }
      parseErrors.push(`${label}: ${msg}${ctx ? ` (周辺: ${JSON.stringify(ctx)})` : ''}`)
      return null
    }
  }

  // 2. Try direct parse
  const direct = tryParse(text, '直接')
  if (direct) return direct

  // 3. Fix trailing commas
  {
    const repaired = text.replace(/,(\s*[}\]])/g, '$1')
    const r = tryParse(repaired, '末尾カンマ')
    if (r) return r
  }

  // 4. Fix string issues on full text
  {
    const repaired = fixJsonStrings(text)
    const r = tryParse(repaired, '文字列修正')
    if (r) return r
  }

  // 5. Extract outermost object, fix strings, then try parse
  const firstBrace = text.indexOf('{')
  const lastBrace = text.lastIndexOf('}')
  const hasObject = firstBrace !== -1 && lastBrace > firstBrace

  if (hasObject) {
    let extracted = fixJsonStrings(text.slice(firstBrace, lastBrace + 1))
    const r = tryParse(extracted, '文字列修正(波括弧)')
    if (r) return r
  }

  // 6. Last resort: salvage pages array even from badly broken JSON
  {
    const salvaged = salvagePagesJson(text)
    if (salvaged) {
      const r = tryParse(salvaged, 'サルベージ')
      if (r) return r
    }
  }

  // 8. Show detailed error with context
  const snippet = text.slice(0, 300)
  const tail = text.slice(-200)
  const lastErrors = parseErrors.slice(-3).join('\n')
  throw new Error(
    `AIの応答を解析できませんでした。\n内部エラー:\n${lastErrors}\n\n応答の冒頭: ${snippet}\n\n応答の末尾: ${tail}`
  )
}

/**
 * Fix common string issues in JSON:
 * - Unescaped newlines/tabs -> \n, \t
 * - Unescaped quotes inside strings -> \"
 * - Unterminated strings -> auto-close
 */
function fixJsonStrings(text: string): string {
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

    if (ch === '"') {
      if (!inString) {
        inString = true
        result += ch
        continue
      }

      // We're in a string and see a quote - is it structural or content?
      const rest = text.slice(i + 1)
      const nextNonWs = rest.match(/^[ \t\r]*(\S)/s)

      if (nextNonWs) {
        const next = nextNonWs[1]
        if (next === ',' || next === ':' || next === '}' || next === ']') {
          inString = false
          result += ch
          continue
        }
      }

      // Check if next meaningful token starts a new JSON value.
      // Special case: if next char is also '"', and the char after that
      // is structural (or end of input), this is likely content+structural pair.
      // e.g. ..."Wow!""}] -> first " is content, second " closes the string.
      const trimmed = rest.trimStart()

      if (trimmed.startsWith('"')) {
        // Look past the second quote
        const afterSecond = trimmed.slice(1).trimStart()
        if (afterSecond.startsWith(',') || afterSecond.startsWith(':') ||
            afterSecond.startsWith('}') || afterSecond.startsWith(']') ||
            afterSecond.length === 0) {
          // First " is content, second is structural
          result += '\\"'
          continue
        }
      }

      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        inString = false
        result += ch
        continue
      }

      // Content quote: escape it
      result += '\\"'
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
      continue
    }

    result += ch
  }

  // Close unterminated string
  if (inString) {
    result += '"'
  }

  return result
}

/**
 * Last-resort salvage: extract pages array from badly broken JSON.
 * Handles unescaped characters by fixing them inline.
 */
function salvagePagesJson(text: string): string | null {
  const pagesMatch = text.match(/"pages"\s*:\s*(\[[\s\S]*)/)
  if (!pagesMatch) return null

  const rest = pagesMatch[1]
  let depth = 0
  let end = -1
  let inStr = false
  let esc = false

  for (let i = 0; i < rest.length; i++) {
    const ch = rest[i]

    if (esc) { esc = false; continue }
    if (ch === '\\' && inStr) { esc = true; continue }
    if (ch === '"') { inStr = !inStr; continue }
    if (inStr) continue

    if (ch === '[') depth++
    else if (ch === ']') {
      depth--
      if (depth === 0) { end = i; break }
    }
  }

  if (end === -1) return null

  let pagesArray = rest.slice(0, end + 1)

  // Fix common issues in the extracted array
  // 1. Literal newlines in strings
  pagesArray = fixJsonStrings(pagesArray)

  return `{"pages":${pagesArray}}`
}
