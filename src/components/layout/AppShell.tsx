import { useState, useEffect } from 'react'
import { useStore } from '@/store'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Header } from './Header'
import { StepIndicator } from './StepIndicator'
import { StepTextbook } from '@/components/steps/StepTextbook'
import { StepStruggle } from '@/components/steps/StepStruggle'
import { StepScript } from '@/components/steps/StepScript'
import { StepPrompts } from '@/components/steps/StepPrompts'
import { SettingsPanel } from '@/components/settings/SettingsPanel'
import { sampleScript } from '@/data/sampleScript'

export function AppShell() {
  // リロード後も作業の続きから再開できるよう、保存済みの進捗から開始位置を決める
  const [step, setStep] = useState(() => (useStore.getState().script ? 3 : useStore.getState().unit ? 2 : 1))
  const [maxReached, setMaxReached] = useState(() =>
    useStore.getState().script ? 4 : useStore.getState().unit ? 2 : 1,
  )
  const [showSettings, setShowSettings] = useState(false)

  const unit = useStore((s) => s.unit)
  const script = useStore((s) => s.script)
  const setScript = useStore((s) => s.setScript)

  const handleShowSample = () => {
    setScript(sampleScript)
    setStep(3)
    setMaxReached(4)
  }

  const goTo = (s: number) => {
    if (s <= maxReached) setStep(s)
  }

  const canAdvanceFrom1 = !!unit
  const canAdvanceFrom2 = !!script
  const canAdvanceFrom3 = !!script

  const handleNext = () => {
    const next = step + 1
    setStep(next)
    if (next > maxReached) setMaxReached(next)
  }

  // ステップを移動したら必ずページの先頭から表示する（縦に長い画面対策）
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  const canNext = step === 1 ? canAdvanceFrom1 : step === 2 ? canAdvanceFrom2 : step === 3 ? canAdvanceFrom3 : false

  return (
    <div className="min-h-screen">
      <Header onOpenSettings={() => setShowSettings(true)} />

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      <StepIndicator currentStep={step} maxReached={maxReached} onStepClick={goTo} />

      <main className="mx-auto max-w-4xl px-4 pb-24">
        <div key={step} className="step-enter">
          {step === 1 && (
            <StepTextbook
              onNext={handleNext}
              canAdvance={canAdvanceFrom1}
              onShowSample={handleShowSample}
            />
          )}
          {step === 2 && (
            <StepStruggle
              onNext={handleNext}
              canAdvance={canAdvanceFrom2}
            />
          )}
          {step === 3 && (
            <StepScript
              onNext={handleNext}
              canAdvance={canAdvanceFrom3}
            />
          )}
          {step === 4 && <StepPrompts />}
        </div>
      </main>

      {/* 縦長ページ対策のフローティングナビ */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 print:hidden">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="ページの先頭へ"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 shadow-lg ring-1 ring-gray-900/10 transition-all hover:-translate-y-0.5 hover:text-indigo-600"
        >
          <Icon name="arrowUp" className="h-4 w-4" />
        </button>
        {canNext && step < 4 && (
          <Button onClick={handleNext} size="md" className="shadow-xl shadow-indigo-600/30">
            次のステップへ →
          </Button>
        )}
      </div>

      <footer className="border-t border-gray-900/5 bg-white/60 py-6 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-1.5 px-4 text-center">
          <p className="font-display text-sm font-bold text-gray-500">📚 学習漫画ジェネレーター</p>
          <p className="text-xs text-gray-400">
            🔒 APIキーはあなたのブラウザにのみ保存され、外部に送信されることはありません
          </p>
          <a
            href="https://github.com/iruiru0605-coder/learning-manga-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-400 underline-offset-2 hover:text-indigo-600 hover:underline"
          >
            GitHub — オープンソース（MIT License）
          </a>
        </div>
      </footer>
    </div>
  )
}
