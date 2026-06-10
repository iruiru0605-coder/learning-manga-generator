export interface Grade {
  id: string
  label: string
  shortLabel: string
  level: 'elementary' | 'middle' | 'high'
  year: number
}

export interface Subject {
  id: string
  label: string
  gradeIds: string[]
}

export interface Textbook {
  id: string
  label: string
  publisher: string
  subjectId: string
  gradeId: string
}

export interface TeachingUnit {
  id: string
  label: string
  textbookId: string
  parentUnitId: string | null
  order: number
}
