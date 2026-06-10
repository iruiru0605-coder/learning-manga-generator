const API_URLS: Record<string, string> = {
  deepseek: 'https://api.deepseek.com',
  openai: 'https://api.openai.com',
  anthropic: 'https://api.anthropic.com',
}

export function getApiBaseUrl(provider: string): string {
  if (import.meta.env.DEV) {
    return `/api/${provider}`
  }
  return API_URLS[provider] ?? `https://api.${provider}.com`
}
