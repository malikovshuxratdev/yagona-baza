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
            className="block min-w-0 w-full max-w-full text-left text-base font-medium text-black line-clamp-2 break-words overflow-hidden hover:text-blue hover:underline disabled:pointer-events-none disabled:text-black"
        >
            {text ?? '-'}
        </button>
    )
}

export default TableText