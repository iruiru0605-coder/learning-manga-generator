import type { AIProvider, ProviderId } from '@/types'
import { DeepSeekProvider } from './deepseek'
import { OpenAIProvider } from './openai'
import { AnthropicProvider } from './anthropic'
import { GeminiProvider } from './gemini'

const providers: Record<ProviderId, AIProvider> = {
  deepseek: new DeepSeekProvider(),
  openai: new OpenAIProvider(),
  anthropic: new AnthropicProvider(),
  gemini: new GeminiProvider(),
}

export function getProvider(id: ProviderId): AIProvider {
  return providers[id]
}

export const providerConfigs = [
  { id: 'gemini' as ProviderId, label: 'Gemini（無料枠あり・画像と同じキー）', defaultModel: 'gemini-2.5-flash' },
  { id: 'deepseek' as ProviderId, label: 'DeepSeek（最も安価・要チャージ）', defaultModel: 'deepseek-chat' },
  { id: 'openai' as ProviderId, label: 'OpenAI', defaultModel: 'gpt-4o-mini' },
  { id: 'anthropic' as ProviderId, label: 'Anthropic', defaultModel: 'claude-haiku-4-5' },
]

export function getDefaultModel(id: ProviderId): string {
  return providerConfigs.find((p) => p.id === id)?.defaultModel ?? 'deepseek-chat'
}
