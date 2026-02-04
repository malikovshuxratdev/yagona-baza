import React from 'react'
import { Dropdown, Button } from 'antd'
import { MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react'
import type { MenuProps } from 'antd'
import { cn } from '@/lib/utils'

interface TableActionProps {
    onView?: () => void
    onEdit?: () => void
    onDelete?: () => void
    className?: string
}

const TableAction: React.FC<TableActionProps> = ({
    onView,
    onEdit,
    onDelete,
    className,
}) => {
    const menuItems: MenuProps['items'] = []

    if (onView) {
        menuItems.push({
            key: 'view',
            label: "Ko'rish",
            icon: <Eye size={18} />,
            onClick: onView,
        })
    }

    if (onEdit) {
        menuItems.push({
            key: 'edit',
            label: 'Tahrirlash',
            icon: <Pencil size={18} />,
            onClick: onEdit,
        })
    }

    if (onDelete) {
        menuItems.push({
            key: 'delete',
            label: "O'chirish",
            icon: <Trash2 size={18} />,
            onClick: onDelete,
            danger: true,
        })
    }

    if (menuItems.length === 0) {
        return null
    }

    return (
        <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            placement="bottomRight"
        >
            <Button
                type="text"
                size="small"
                className={cn('p-2 border-none shadow-none hover:bg-gray-light-1 flex items-center justify-center', className)}
            >
                <MoreVertical className="h-4 w-4" />
            </Button>
        </Dropdown>
    )
}

export default TableAction