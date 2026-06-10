import type { StateCreator } from 'zustand'
import type { ProviderId } from '@/types'

export interface SettingsSlice {
  apiKey: string
  provider: ProviderId
  modelName: string
  setApiKey: (key: string) => void
  setProvider: (p: ProviderId) => void
  setModelName: (m: string) => void
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  apiKey: '',
  provider: 'deepseek',
  modelName: 'deepseek-chat',
  setApiKey: (apiKey) => set({ apiKey }),
  setProvider: (provider) => set({ provider }),
  setModelName: (modelName) => set({ modelName }),
})
