import { useState } from 'react'
import { cn } from '@/lib/cn'
import { Button } from './Button'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

export function CopyButton({ text, label = 'コピー', className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant={copied ? 'primary' : 'secondary'}
      size="sm"
      onClick={handleCopy}
      className={cn('min-w-20', className)}
    >
      {copied ? 'コピー済み ✓' : label}
    </Button>
  )
}
