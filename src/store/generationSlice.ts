import type { StateCreator } from 'zustand'
import type { MangaScript } from '@/types'

export type GenerationStatus = 'idle' | 'generating' | 'success' | 'error'

export interface GenerationSlice {
  struggle: string
  script: MangaScript | null
  status: GenerationStatus
  error: string | null
  setStruggle: (s: string) => void
  setScript: (s: MangaScript) => void
  setStatus: (s: GenerationStatus) => void
  setError: (e: string | null) => void
  resetGeneration: () => void
}

const initial = {
  struggle: '',
  script: null,
  status: 'idle' as GenerationStatus,
  error: null,
}

export const createGenerationSlice: StateCreator<GenerationSlice> = (set) => ({
  ...initial,
  setStruggle: (struggle) => set({ struggle }),
  setScript: (script) => set({ script, status: 'success', error: null }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error, status: 'error' }),
  resetGeneration: () => set(initial),
})
