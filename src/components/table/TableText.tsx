import React from 'react'

interface TableTextProps {
    text: string
    onClick?: () => void
    disabled?: boolean
}

const TableText: React.FC<TableTextProps> = ({ text, onClick, disabled = false }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="flex-1 text-left text-base font-medium text-black line-clamp-2 hover:text-blue hover:underline disabled:pointer-events-none disabled:text-black"
        >
            {text ?? '-'}
        </button>
    )
}

export default TableText