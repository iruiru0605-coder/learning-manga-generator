export interface DialogueLine {
  speaker: string
  text: string
  type: 'speech' | 'narration' | 'thought'
}

export interface MangaPanel {
  panelNumber: number
  size: string
  composition: string
  dialogue: DialogueLine[]
  narration?: string
  effects?: string
}

export interface MangaPage {
  pageNumber: number
  title: string
  summary: string
  panels: MangaPanel[]
  imageGenerationPrompt: string
}

export interface CharacterDesign {
  name: string
  appearance: string
  personality: string
  role?: string
}

export interface MangaCharacterDesign {
  teacher: CharacterDesign
  student: CharacterDesign
  mascot?: CharacterDesign
}

export type StudentGender = 'auto' | 'boy' | 'girl'

/** 保護者が指定する主人公（生徒役）のカスタマイズ */
export interface CharacterCustom {
  studentName: string
  studentGender: StudentGender
  characterNotes: string
}

export interface MangaScript {
  title: string
  unitName: string
  struggleSummary: string
  targetAudience: string
  characterDesign?: MangaCharacterDesign
  testKeywords?: string[]
  pages: MangaPage[]
  createdAt: string
}
