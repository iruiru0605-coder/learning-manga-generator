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
