import React from 'react'
import { cn } from '@/lib/utils'

interface OrganizationDetailRowProps {
    label: string
    value: React.ReactNode
    isLast?: boolean
    className?: string
}

export const OrganizationDetailRow: React.FC<OrganizationDetailRowProps> = ({
    label,
    value,
    isLast = false,
    className = ""
}) => {
    return (
        <div className={cn(
            "group grid grid-cols-1 md:grid-cols-12 border-b transition-colors duration-200 hover:bg-gray-50",
            isLast ? 'border-b-0' : 'border-gray-100',
            className
        )}>
            <div className="md:col-span-3 text-base p-4 font-semibold text-gray-700 bg-gray-50/50 flex items-start border-r border-transparent md:border-gray-100 group-hover:bg-gray-50/80">
                <span>{label}</span>
            </div>
            <div className="md:col-span-9 text-base p-4 text-gray-900 bg-white group-hover:bg-gray-50/20">
                <span className="text-gray-800">{value || '-'}</span>
            </div>
        </div>
    )
}
