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
        'bg-white rounded-2xl ring-1 ring-gray-900/5 shadow-sm',
        onClick && 'cursor-pointer hover:ring-indigo-300 hover:shadow-md hover:-translate-y-0.5 transition-all',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
