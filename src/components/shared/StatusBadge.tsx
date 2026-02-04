import { cn } from '@/lib/utils'
import React from 'react'

interface StatusBadgeProps {
  is_active: boolean
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ is_active }) => {
  return (
    <div className={cn(
      'w-fit px-3 py-1 rounded-md text-sm font-medium',
      is_active
        ? 'bg-green-light-3 text-white'
        : 'bg-red-light-2 text-white'
    )}>
      {is_active ? 'Faol' : 'Faol emas'}
    </div>
  )
}

export default StatusBadge