import React from 'react';
import { Pagination as AntPagination } from 'antd';
import type { PaginationProps as AntPaginationProps } from 'antd';
import './Pagination.css';

interface PaginationProps {
    current?: number;
    total: number;
    pageSize?: number;
    onChange?: (page: number, pageSize: number) => void;
    showSizeChanger?: boolean;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    current = 1,
    total,
    pageSize = 10,
    onChange,
    showSizeChanger = false,
    className = '',
}) => {
    const handleChange: AntPaginationProps['onChange'] = (page, pageSize) => {
        onChange?.(page, pageSize);
    };
    return (
        <div className={`custom-pagination-wrapper ${className}`}>
            <AntPagination
                current={current}
                total={total}
                pageSize={pageSize}
                onChange={handleChange}
                showSizeChanger={showSizeChanger}
                prevIcon={
                    <span className="pagination-nav-btn hover:bg-gray-bg rounded-lg p-1 flex items-center gap-1">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 12L6 8L10 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="hidden sm:inline">
                            Oldingi
                        </span>
                    </span>
                }
                nextIcon={
                    <span className="pagination-nav-btn hover:bg-gray-bg rounded-lg p-1 flex items-center gap-1">
                        <span className="hidden sm:inline">
                            Keyingi
                        </span>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 12L10 8L6 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                }
                showLessItems={true}
                responsive={true}
            />
        </div>
    );
};

export default Pagination;
