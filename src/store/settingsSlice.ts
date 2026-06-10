import type { StateCreator } from 'zustand'
import type { ProviderId } from '@/types'

export interface SettingsSlice {
  apiKey: string
  provider: ProviderId
  modelName: string
  characterImageUrl: string
  imageApiKey: string
  setApiKey: (key: string) => void
  setProvider: (p: ProviderId) => void
  setModelName: (m: string) => void
  setCharacterImageUrl: (url: string) => void
  setImageApiKey: (key: string) => void
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  apiKey: '',
  provider: 'deepseek',
  modelName: 'deepseek-chat',
  characterImageUrl: '',
  imageApiKey: '',
  setApiKey: (apiKey) => set({ apiKey }),
  setProvider: (provider) => set({ provider }),
  setModelName: (modelName) => set({ modelName }),
  setCharacterImageUrl: (characterImageUrl) => set({ characterImageUrl }),
  setImageApiKey: (imageApiKey) => set({ imageApiKey }),
})
