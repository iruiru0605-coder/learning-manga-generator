import { cn } from '@/lib/cn'

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
      <span className="text-sm text-gray-500">生成中...</span>
    </div>
  )
}
