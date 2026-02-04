import React from 'react'
import { ArrowLeft, Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'
import { formatNumber } from '@/helpers'

interface HeaderTitleProps {
    title?: string
    onBack?: () => void
    onCreate?: () => void
    onEdit?: () => void
    onDelete?: () => void
    total?: number
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
    title,
    onBack,
    onCreate,
    onEdit,
    onDelete,
    total
}) => {
    return (
        <div className="mb-4">
            {onBack && (
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="text-base font-medium text-primary-blue hover:text-blue mb-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Ortga
                </Button>
            )}

            <div className={`flex items-center ${title ? 'justify-between' : 'justify-end'}`}>
                {title && (
                    <h1 className="text-2xl font-bold text-black">
                        {title}
                    </h1>
                )}
                {(onCreate || onEdit || onDelete) && (
                    <div className="flex items-center gap-3">
                        {onCreate && (
                            <Button
                                variant="default"
                                onClick={onCreate}
                                className="bg-blue text-white hover:opacity-90"
                            >
                                <Plus className="w-4 h-4 font-bold" />
                                Yaratish
                            </Button>
                        )}
                        {onEdit && (
                            <Button
                                variant="default"
                                onClick={onEdit}
                                className="bg-blue text-white hover:opacity-90"
                            >
                                <Pencil className="w-4 h-4" />
                                Tahrirlash
                            </Button>
                        )}
                        {onDelete && (
                            <Button
                                variant="destructive"
                                onClick={onDelete}
                                className="bg-red text-white hover:opacity-90"
                            >
                                <Trash2 className="w-4 h-4" />
                                O'chirish
                            </Button>
                        )}
                    </div>
                )}
            </div>
            {total && (
                <div className="text-lg text-gray-500 text-left mt-2">
                    Jami: {formatNumber(total)} ta
                </div>
            )}
        </div>
    )
}

export default HeaderTitle