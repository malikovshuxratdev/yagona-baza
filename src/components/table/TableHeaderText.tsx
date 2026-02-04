import React from 'react'

interface TableHeaderTextProps {
    text: string
}

const TableHeaderText: React.FC<TableHeaderTextProps> = ({ text }) => {
    return (
        <span className="text-base font-normal text-primary-blue">
            {text}
        </span>
    )
}

export default TableHeaderText