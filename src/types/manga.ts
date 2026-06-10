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

export interface MangaScript {
  title: string
  unitName: string
  struggleSummary: string
  targetAudience: string
  pages: MangaPage[]
  createdAt: string
}
