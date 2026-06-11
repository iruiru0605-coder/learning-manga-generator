import type { StateCreator } from 'zustand'
import type { ProviderId, StudentGender } from '@/types'
import { IMAGE_MODELS } from '@/services/image/gemini'

export interface SettingsSlice {
  apiKey: string
  provider: ProviderId
  modelName: string
  characterImageUrl: string
  imageApiKey: string
  imageModel: string
  studentName: string
  studentGender: StudentGender
  characterNotes: string
  characterRefImage: string
  /** その場で生成したオリジナル主人公キャラ画像（漫画スタイル・縮小済みdataURL） */
  customCharacterImage: string
  /** 漫画のページ数（4/8/12） */
  pageCount: number
  setApiKey: (key: string) => void
  setProvider: (p: ProviderId) => void
  setModelName: (m: string) => void
  setCharacterImageUrl: (url: string) => void
  setImageApiKey: (key: string) => void
  setImageModel: (m: string) => void
  setStudentName: (name: string) => void
  setStudentGender: (g: StudentGender) => void
  setCharacterNotes: (notes: string) => void
  setCharacterRefImage: (dataUrl: string) => void
  setCustomCharacterImage: (dataUrl: string) => void
  setPageCount: (n: number) => void
}

export const createSettingsSlice: StateCreator<SettingsSlice> = (set) => ({
  apiKey: '',
  // 無料枠があり画像生成と同じキーで使える Gemini を初期値にする
  provider: 'gemini',
  modelName: 'gemini-2.5-flash',
  characterImageUrl: '',
  imageApiKey: '',
  imageModel: IMAGE_MODELS.standard,
  studentName: '',
  studentGender: 'auto',
  characterNotes: '',
  characterRefImage: '',
  customCharacterImage: '',
  pageCount: 8,
  setApiKey: (apiKey) => set({ apiKey }),
  setProvider: (provider) => set({ provider }),
  setModelName: (modelName) => set({ modelName }),
  setCharacterImageUrl: (characterImageUrl) => set({ characterImageUrl }),
  setImageApiKey: (imageApiKey) => set({ imageApiKey }),
  setImageModel: (imageModel) => set({ imageModel }),
  setStudentName: (studentName) => set({ studentName }),
  setStudentGender: (studentGender) => set({ studentGender }),
  setCharacterNotes: (characterNotes) => set({ characterNotes }),
  setCharacterRefImage: (characterRefImage) => set({ characterRefImage }),
  setCustomCharacterImage: (customCharacterImage) => set({ customCharacterImage }),
  setPageCount: (pageCount) => set({ pageCount }),
})
