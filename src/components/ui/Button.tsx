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
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
        {
          primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm',
          secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm',
          ghost: 'text-gray-600 hover:bg-gray-100',
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
