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
        characterImageUrl: state.characterImageUrl,
        imageApiKey: state.imageApiKey,
        imageModel: state.imageModel,
        studentName: state.studentName,
        studentGender: state.studentGender,
        characterNotes: state.characterNotes,
        characterRefImage: state.characterRefImage,
        customCharacterImage: state.customCharacterImage,
        pageCount: state.pageCount,
        // 作業内容もリロードで消えないように永続化する
        grade: state.grade,
        subject: state.subject,
        textbook: state.textbook,
        unit: state.unit,
        struggle: state.struggle,
        script: state.script,
        lastUsage: state.lastUsage,
      }),
    }
  )
)

export { type TextbookSlice, type GenerationSlice, type SettingsSlice }
