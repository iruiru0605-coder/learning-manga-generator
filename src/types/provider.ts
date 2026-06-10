export type ProviderId = 'deepseek' | 'openai' | 'anthropic'

export interface ProviderConfig {
  id: ProviderId
  label: string
  defaultModel: string
  endpoint: string
  requiresApiKey: boolean
}

export interface GenerationRequest {
  systemPrompt: string
  userPrompt: string
  model: string
  apiKey: string
  baseUrl?: string
}

export interface GenerationResponse {
  content: string
  model: string
  usage?: { inputTokens: number; outputTokens: number }
}

export interface AIProvider {
  id: ProviderId
  generate(req: GenerationRequest): Promise<GenerationResponse>
}
