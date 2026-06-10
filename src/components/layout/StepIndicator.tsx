import { cn } from '@/lib/cn'

const steps = ['教科書を選ぶ', '苦手を教える', '漫画を生成', 'プロンプトを取得']

interface StepIndicatorProps {
  currentStep: number
  maxReached: number
  onStepClick: (step: number) => void
}

export function StepIndicator({ currentStep, maxReached, onStepClick }: StepIndicatorProps) {
  return (
    <nav className="mx-auto max-w-2xl px-4 py-4">
      <ol className="flex items-center justify-between">
        {steps.map((label, i) => {
          const step = i + 1
          const isActive = step === currentStep
          const isReached = step <= maxReached

          return (
            <li key={step} className="flex items-center">
              <button
                onClick={() => isReached && onStepClick(step)}
                disabled={!isReached}
                className={cn(
                  'flex items-center gap-1.5 text-sm font-medium transition-colors',
                  isReached ? 'cursor-pointer' : 'cursor-default opacity-40',
                  isActive ? 'text-indigo-600' : 'text-gray-500'
                )}
              >
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                    isActive && 'bg-indigo-600 text-white',
                    isReached && !isActive && 'bg-indigo-100 text-indigo-600',
                    !isReached && 'bg-gray-200 text-gray-400'
                  )}
                >
                  {step}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {step < steps.length && (
                <span className="mx-2 h-px w-8 bg-gray-200 sm:w-12" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
