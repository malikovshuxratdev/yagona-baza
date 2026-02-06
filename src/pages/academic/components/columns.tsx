import { useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { TableAction, TableHeaderText, TableText } from '@/components';
import { formatNumber } from '@/helpers';
import type { AkademWinner } from '@/types';

export interface UseWinnerProjectsColumnsProps {
    pagination: {
        page: number;
        pageSize: number;
        total: number;
    };
    onView: (record: AkademWinner) => void;
}

export const useWinnerProjectsColumns = ({
    pagination,
    onView,
}: UseWinnerProjectsColumnsProps): ColumnsType<AkademWinner> => {
    return useMemo<ColumnsType<AkademWinner>>(
        () => [
            {
                title: <TableHeaderText text="№" />,
                key: 'index',
                width: 64,
                align: 'center',
                render: (_: unknown, __: AkademWinner, index: number) =>
                    (pagination.page - 1) * pagination.pageSize + index + 1,
            },
            {
                title: <TableHeaderText text="F.I.O." />,
                key: 'scientist',
                width: 220,
                render: (_: unknown, record: AkademWinner) => (
                    <TableText
                        text={record.scientist?.full_name ?? '–'}
                        onClick={() => onView(record)}
                    />
                ),
            },
            {
                title: <TableHeaderText text="Science ID" />,
                key: 'science_id',
                width: 140,
                render: (_: unknown, record: AkademWinner) => (
                    <TableText text={record.scientist?.science_id ?? '–'} disabled />
                ),
            },
            {
                title: <TableHeaderText text="Loyiha" />,
                dataIndex: 'project_name',
                key: 'project_name',
                width: 200,
                render: (_: unknown, record: AkademWinner) => (
                    <TableText
                        text={record.project_name ?? '–'}
                        disabled
                    />
                ),
            },
            {
                title: <TableHeaderText text="Summa" />,
                key: 'total_amount',
                width: 140,
                render: (_: unknown, record: AkademWinner) => (
                    <TableText
                        text={`${formatNumber(record.total_amount ?? '')} so'm`}
                        disabled
                    />
                ),
            },
            {
                title: <TableHeaderText text="" />,
                key: 'actions',
                width: 60,
                align: 'end',
                render: (_: unknown, record: AkademWinner) => (
                    <TableAction onView={() => onView(record)} />
                ),
            },
        ],
        [pagination.page, pagination.pageSize, onView]
    );
};
