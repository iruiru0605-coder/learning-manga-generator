import { cn } from '@/lib/cn'

const steps = ['教科書を選ぶ', '苦手を教える', '漫画を生成', '画像にする']

interface StepIndicatorProps {
  currentStep: number
  maxReached: number
  onStepClick: (step: number) => void
}

export function StepIndicator({ currentStep, maxReached, onStepClick }: StepIndicatorProps) {
  return (
    <nav className="mx-auto max-w-2xl px-4 py-5">
      <ol className="flex items-center rounded-2xl bg-white/70 px-4 py-3 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:px-6">
        {steps.map((label, i) => {
          const step = i + 1
          const isActive = step === currentStep
          const isDone = step < currentStep
          const isReached = step <= maxReached

          return (
            <li key={step} className={cn('flex items-center', step < steps.length && 'flex-1')}>
              <button
                onClick={() => isReached && onStepClick(step)}
                disabled={!isReached}
                className={cn(
                  'group flex flex-col items-center gap-1 sm:flex-row sm:gap-2',
                  isReached ? 'cursor-pointer' : 'cursor-default'
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all',
                    isActive &&
                      'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 ring-4 ring-indigo-100',
                    isDone && 'bg-green-500 text-white shadow-sm',
                    !isActive && !isDone && isReached && 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200',
                    !isReached && 'bg-gray-100 text-gray-300'
                  )}
                >
                  {isDone ? '✓' : step}
                </span>
                <span
                  className={cn(
                    'font-display text-[10px] font-bold sm:text-xs',
                    isActive ? 'text-indigo-700' : isDone ? 'text-green-600' : isReached ? 'text-gray-500' : 'text-gray-300'
                  )}
                >
                  {label}
                </span>
              </button>
              {step < steps.length && (
                <span className="mx-2 h-1 flex-1 overflow-hidden rounded-full bg-gray-100 sm:mx-3">
                  <span
                    className={cn(
                      'block h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500',
                      step < currentStep ? 'w-full' : 'w-0'
                    )}
                  />
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
