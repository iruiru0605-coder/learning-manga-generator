import type { StateCreator } from 'zustand'
import type { Grade, Subject, Textbook, TeachingUnit } from '@/types'

export interface TextbookSlice {
  grade: Grade | null
  subject: Subject | null
  textbook: Textbook | null
  unit: TeachingUnit | null
  setGrade: (g: Grade) => void
  setSubject: (s: Subject) => void
  setTextbook: (t: Textbook) => void
  setUnit: (u: TeachingUnit) => void
}

export const createTextbookSlice: StateCreator<TextbookSlice> = (set) => ({
  grade: null,
  subject: null,
  textbook: null,
  unit: null,
  setGrade: (grade) => set({ grade, subject: null, textbook: null, unit: null }),
  setSubject: (subject) => set({ subject, textbook: null, unit: null }),
  setTextbook: (textbook) => set({ textbook, unit: null }),
  setUnit: (unit) => set({ unit }),
})
