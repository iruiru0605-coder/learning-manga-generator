import type { StateCreator } from 'zustand'
import type { MangaScript } from '@/types'

export type GenerationStatus = 'idle' | 'generating' | 'success' | 'error'

export interface GenerationUsage {
  inputTokens: number
  outputTokens: number
  providerId: string
}

export interface GenerationSlice {
  struggle: string
  script: MangaScript | null
  status: GenerationStatus
  error: string | null
  lastUsage: GenerationUsage | null
  setStruggle: (s: string) => void
  setScript: (s: MangaScript) => void
  setStatus: (s: GenerationStatus) => void
  setError: (e: string | null) => void
  setLastUsage: (u: GenerationUsage | null) => void
  /** 台本のセリフをインライン編集する（編集結果は画像生成・セリフ一覧・印刷にも反映される） */
  updateDialogueText: (pageNumber: number, panelNumber: number, dialogueIndex: number, text: string) => void
  resetGeneration: () => void
}

const initial = {
  struggle: '',
  script: null,
  status: 'idle' as GenerationStatus,
  error: null,
  lastUsage: null,
}

export const createGenerationSlice: StateCreator<GenerationSlice> = (set) => ({
  ...initial,
  setStruggle: (struggle) => set({ struggle }),
  setScript: (script) => set({ script, status: 'success', error: null }),
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error, status: 'error' }),
  setLastUsage: (lastUsage) => set({ lastUsage }),
  updateDialogueText: (pageNumber, panelNumber, dialogueIndex, text) =>
    set((state) => {
      if (!state.script) return {}
      const pages = state.script.pages.map((p) =>
        p.pageNumber !== pageNumber
          ? p
          : {
              ...p,
              panels: (p.panels ?? []).map((panel) =>
                panel.panelNumber !== panelNumber
                  ? panel
                  : {
                      ...panel,
                      dialogue: (panel.dialogue ?? []).map((d, i) => (i === dialogueIndex ? { ...d, text } : d)),
                    },
              ),
            },
      )
      return { script: { ...state.script, pages } }
    }),
  resetGeneration: () => set(initial),
})
