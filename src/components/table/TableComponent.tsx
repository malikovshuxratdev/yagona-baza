import React, { useCallback } from 'react'
import { Table, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EmptyState, Pagination } from '../shared';
import { PageLoading } from '@/components';

interface TableComponentProps<T = any> {
  data: T[];
  columns: ColumnsType<T>;
  isLoading: boolean;
  isError?: boolean;
  errorMessage?: string;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
  setPage?: (page: number) => void;
  setPageSize?: (size: number) => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateIcon?: React.ReactNode;
  emptyStateAction?: React.ReactNode;
  rowKey?: string | ((record: T) => string | number);
  tableSize?: 'small' | 'middle' | 'large';
  scroll?: TableProps<T>['scroll'];
  tableClassName?: string;
  showPagination?: boolean;
  paginationPosition?: 'left' | 'center' | 'right';
  showSizeChanger?: boolean;
  onRow?: TableProps<T>['onRow'];
  rowSelection?: TableProps<T>['rowSelection'];
  expandable?: TableProps<T>['expandable'];
  className?: string;
}

const TableComponent = <T extends Record<string, any> = any>({
  data,
  columns,
  isLoading,
  isError = false,
  errorMessage,
  pagination,
  setPage,
  setPageSize,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
  emptyStateAction,
  rowKey = 'id',
  tableSize = 'middle',
  scroll = { x: 1200 },
  tableClassName,
  showPagination = true,
  paginationPosition = 'left',
  showSizeChanger = false,
  onRow,
  rowSelection,
  expandable,
  className,
}: TableComponentProps<T>) => {

  const handlePaginationChange = useCallback(
    (page: number, pageSize: number) => {
      setPage?.(page);
      if (pagination && pageSize !== pagination.pageSize) {
        setPageSize?.(pageSize);
      }
    },
    [setPage, setPageSize, pagination?.pageSize]
  );

  const getRowKey = useCallback((record: T): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] ?? record.id ?? record._id ?? 'no-key';
  }, [rowKey]);

  const getPaginationPositionClass = () => {
    switch (paginationPosition) {
      case 'center':
        return 'justify-center';
      case 'right':
        return 'justify-end';
      default:
        return 'justify-start';
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    return (
      <EmptyState
        title={errorMessage || 'Xatolik yuz berdi'}
        description="Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        icon={emptyStateIcon}
        action={emptyStateAction}
      />
    );
  }

  return (
    <div className={`space-y-5 ${className || ''}`}>
      <Table<T>
        rowKey={getRowKey}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={scroll}
        size={tableSize}
        tableLayout="fixed"
        className={tableClassName || 'overflow-x-auto'}
        onRow={onRow}
        rowSelection={rowSelection}
        expandable={expandable}
        locale={{
          emptyText: (
            <EmptyState
              title={emptyStateTitle}
              description={emptyStateDescription}
            />
          ),
        }}
      />
      {showPagination && pagination && pagination.total > 0 && (
        <div className={`flex ${getPaginationPositionClass()}`}>
          <Pagination
            current={pagination.page}
            total={pagination.total}
            pageSize={pagination.pageSize}
            onChange={handlePaginationChange}
            showSizeChanger={showSizeChanger}
          />
        </div>
      )}
    </div>
  )
}

export default TableComponent