import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none cursor-pointer active:scale-[0.98]',
        {
          primary:
            'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25 hover:from-indigo-500 hover:to-violet-500 hover:shadow-lg hover:shadow-indigo-600/30',
          secondary:
            'bg-white text-gray-700 ring-1 ring-gray-200 shadow-sm hover:bg-indigo-50/60 hover:ring-indigo-200 hover:text-indigo-700',
          ghost: 'text-gray-600 hover:bg-gray-900/5 hover:text-gray-900',
        }[variant],
        {
          sm: 'h-8 px-3 text-sm',
          md: 'h-10 px-4 text-sm',
          lg: 'h-12 px-6 text-base',
        }[size],
        className
      )}
      {...props}
    />
  )
}
