/**
 * Convert raw English error messages from AI provider APIs
 * (DeepSeek / OpenAI / Anthropic / Gemini) into actionable
 * Japanese messages for non-technical users.
 * The original message is kept as a detail line for debugging.
 */
export function toFriendlyErrorMessage(err: unknown, fallback: string): string {
  const raw = err instanceof Error ? err.message : typeof err === 'string' ? err : ''
  if (!raw) return fallback
  const m = raw.toLowerCase()

  // DeepSeek: "Insufficient Balance" / Anthropic: "credit balance is too low" / HTTP 402
  if (
    m.includes('insufficient balance') ||
    m.includes('credit balance is too low') ||
    m.includes('(402)')
  ) {
    return withDetail(
      'アカウントの残高が不足しています。APIキー自体は正しく認識されているので、プロバイダーのサイトでチャージすると使えるようになります（DeepSeekの場合: platform.deepseek.com にログイン → 「Top up」からチャージ）。',
      raw,
    )
  }

  // OpenAI: "Incorrect API key provided" / Gemini: "API key not valid" / Anthropic: "invalid x-api-key" / HTTP 401
  if (
    m.includes('api key not valid') ||
    m.includes('incorrect api key') ||
    m.includes('invalid api key') ||
    m.includes('invalid x-api-key') ||
    m.includes('authentication') ||
    m.includes('(401)')
  ) {
    return withDetail(
      'APIキーが正しくないようです。右上の「API設定」からキーを確認してください（コピー時に前後へ余分な空白が入っていないかにも注意）。',
      raw,
    )
  }

  // Quota / rate limit: OpenAI "exceeded your current quota" / Gemini RESOURCE_EXHAUSTED / HTTP 429
  if (
    m.includes('exceeded your current quota') ||
    m.includes('rate limit') ||
    m.includes('resource_exhausted') ||
    m.includes('quota') ||
    m.includes('(429)')
  ) {
    return withDetail(
      'APIの利用上限に達しました。少し時間をおいて再試行してください。無料枠をお使いの場合は翌日に回復します。有料アカウントの場合は残高・支払い設定をご確認ください。',
      raw,
    )
  }

  // Browser network errors: Chrome "Failed to fetch" / Firefox "NetworkError" / Safari "Load failed"
  if (m.includes('failed to fetch') || m.includes('networkerror') || m.includes('load failed')) {
    return 'ネットワークに接続できませんでした。インターネット接続を確認して、もう一度お試しください。'
  }

  return raw
}

function withDetail(friendly: string, raw: string): string {
  return `${friendly}\n（詳細: ${raw}）`
}
