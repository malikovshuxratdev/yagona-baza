import { useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { TableAction, TableHeaderText, TableText } from '@/components';
import type { ReestrOrganizationListItem } from '@/types';

interface UseReestrOrganizationColumnsProps {
    pagination: {
        page: number;
        pageSize: number;
        total: number;
    };
    handleView: (id: number) => void;
}

export const useReestrOrganizationColumns = ({
    pagination,
    handleView,
}: UseReestrOrganizationColumnsProps): ColumnsType<ReestrOrganizationListItem> => {
    return useMemo<ColumnsType<ReestrOrganizationListItem>>(
        () => [
            {
                title: <TableHeaderText text="№" />,
                dataIndex: 'id',
                width: 40,
                align: 'center',
                render: (_: unknown, __: ReestrOrganizationListItem, index: number) => {
                    const pageIndex = (pagination.page - 1) * pagination.pageSize;
                    return pageIndex + index + 1;
                },
            },
            {
                title: <TableHeaderText text="Nomi" />,
                dataIndex: 'name',
                key: 'name',
                width: 320,
                ellipsis: true,
                render: (_: unknown, record: ReestrOrganizationListItem) => (
                    <TableText
                        text={record?.name ?? '-'}
                        onClick={() => handleView(record?.id)}
                    />
                ),
            },
            {
                title: <TableHeaderText text="STIR" />,
                dataIndex: 'tin',
                key: 'tin',
                width: 120,
                render: (tin: string) => (
                    <TableText text={tin ?? '-'} disabled />
                ),
            },
            {
                title: <TableHeaderText text="Qisqa nomi" />,
                dataIndex: 'short_name',
                key: 'short_name',
                width: 160,
                ellipsis: true,
                render: (short_name: string) => (
                    <TableText text={short_name ?? '-'} disabled />
                ),
            },
            {
                title: <TableHeaderText text="Tashkilot sinfi" />,
                dataIndex: 'org_class',
                key: 'org_class',
                width: 140,
                render: (org_class: string) => (
                    <TableText text={org_class ?? '-'} disabled />
                ),
            },
            {
                title: <TableHeaderText text="Qo'shilgan sana" />,
                dataIndex: 'created_at',
                key: 'created_at',
                width: 120,
                render: (date: string) => (
                    <TableText
                        text={date ? new Date(date).toLocaleDateString('uz-UZ') : '–'}
                        disabled
                    />
                ),
            },
            {
                title: <TableHeaderText text="" />,
                dataIndex: 'actions',
                width: 40,
                align: 'end',
                render: (_: unknown, record: ReestrOrganizationListItem) => (
                    <TableAction onView={() => handleView(record?.id)} />
                ),
            },
        ],
        [pagination.page, pagination.pageSize, handleView]
    );
};
