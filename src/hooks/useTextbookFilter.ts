import { useMemo } from 'react'
import { useStore } from '@/store'
import { subjects, textbooks, units, grades } from '@/data/textbooks'
import type { Subject, Textbook, TeachingUnit } from '@/types'

export function useTextbookFilter() {
  const grade = useStore((s) => s.grade)
  const subject = useStore((s) => s.subject)
  const textbook = useStore((s) => s.textbook)

  const availableSubjects = useMemo<Subject[]>(() => {
    if (!grade) return []
    return subjects.filter((s) => s.gradeIds.includes(grade.id))
  }, [grade])

  const availableTextbooks = useMemo<Textbook[]>(() => {
    if (!grade || !subject) return []
    return textbooks.filter(
      (t) => t.gradeId === grade.id && t.subjectId === subject.id
    )
  }, [grade, subject])

  const availableUnits = useMemo<TeachingUnit[]>(() => {
    if (!textbook) return []
    return units.filter((u) => u.textbookId === textbook.id).sort((a, b) => a.order - b.order)
  }, [textbook])

  const gradeLabel = grade ? grades.find((g) => g.id === grade.id)?.label : null
  const subjectLabel = subject?.label ?? null
  const textbookLabel = textbook?.label ?? null

  return {
    availableSubjects,
    availableTextbooks,
    availableUnits,
    gradeLabel,
    subjectLabel,
    textbookLabel,
  }
}
