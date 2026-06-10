import { cn } from '@/lib/cn'

interface CardProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export function Card({ className, children, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 shadow-sm',
        onClick && 'cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
