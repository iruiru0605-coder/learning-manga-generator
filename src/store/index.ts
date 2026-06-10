import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { createTextbookSlice, type TextbookSlice } from './textbookSlice'
import { createGenerationSlice, type GenerationSlice } from './generationSlice'
import { createSettingsSlice, type SettingsSlice } from './settingsSlice'

export type StoreState = TextbookSlice & GenerationSlice & SettingsSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createTextbookSlice(...a),
      ...createGenerationSlice(...a),
      ...createSettingsSlice(...a),
    }),
    {
      name: 'learning-manga-storage',
      partialize: (state) => ({
        apiKey: state.apiKey,
        provider: state.provider,
        modelName: state.modelName,
      }),
    }
  )
)

export { type TextbookSlice, type GenerationSlice, type SettingsSlice }
