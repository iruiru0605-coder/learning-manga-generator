import { useState } from 'react'
import { useStore } from '@/store'
import { Header } from './Header'
import { StepIndicator } from './StepIndicator'
import { StepTextbook } from '@/components/steps/StepTextbook'
import { StepStruggle } from '@/components/steps/StepStruggle'
import { StepScript } from '@/components/steps/StepScript'
import { StepPrompts } from '@/components/steps/StepPrompts'
import { SettingsPanel } from '@/components/settings/SettingsPanel'

export function AppShell() {
  const [step, setStep] = useState(1)
  const [maxReached, setMaxReached] = useState(1)
  const [showSettings, setShowSettings] = useState(false)

  const unit = useStore((s) => s.unit)
  const script = useStore((s) => s.script)

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

  return (
    <div className="min-h-screen">
      <Header onOpenSettings={() => setShowSettings(true)} />

      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}

      <StepIndicator currentStep={step} maxReached={maxReached} onStepClick={goTo} />

      <main className="mx-auto max-w-4xl px-4 pb-16">
        {step === 1 && (
          <StepTextbook
            onNext={handleNext}
            canAdvance={canAdvanceFrom1}
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
      </main>

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
