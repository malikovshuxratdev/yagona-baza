import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
      h2: 'text-3xl font-semibold tracking-tight',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'text-xl font-semibold tracking-tight',
      h5: 'text-lg font-semibold tracking-tight',
      h6: 'text-base font-semibold tracking-tight',
      p: 'text-base leading-7',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
})

type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  }

function Typography({
  className,
  variant,
  as,
  ...props
}: TypographyProps) {
  const Component = as || (variant?.startsWith('h') ? (variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') : 'p')

  return (
    <Component
      data-slot="typography"
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
export type { TypographyProps }
