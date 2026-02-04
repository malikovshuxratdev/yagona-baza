import { useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { TableAction, TableHeaderText, TableText } from '@/components';
import { ScienceIdUser } from '@/types/science-id-type/scienceIdUserType';
import { convertFirstTwoParts, fullDateTimeFormat, formatPhoneNumber } from '@/helpers';

interface UseScienceIdUserColumnsProps {
    pagination: {
        page: number;
        pageSize: number;
        total: number;
    };
    handleView: (id: number) => void;
}

export const useScienceIdUserColumns = ({
    pagination,
    handleView,
}: UseScienceIdUserColumnsProps): ColumnsType<ScienceIdUser> => {
    return useMemo<ColumnsType<ScienceIdUser>>(
        () => [
            {
                title: <TableHeaderText text="№" />,
                dataIndex: 'id',
                width: 40,
                align: 'center',
                render: (_: unknown, __: ScienceIdUser, index: number) => {
                    const pageIndex =
                        (pagination.page - 1) * pagination.pageSize;
                    return pageIndex + index + 1;
                },
            },
            {
                title: <TableHeaderText text="F.I.O." />,
                dataIndex: 'full_name',
                width: 220,
                align: 'start',
                render: (_: unknown, record: ScienceIdUser) => <TableText onClick={() => handleView(record?.id)} text={convertFirstTwoParts(record?.full_name ?? '-') ?? '-'} />,
            },
            {
                title: <TableHeaderText text="Science ID" />,
                dataIndex: 'science_id',
                width: 140,
                align: 'start',
                render: (_: unknown, record: ScienceIdUser) => <TableText text={record?.science_id ?? '-'} disabled />,
            },
            {
                title: <TableHeaderText text="Telefon" />,
                dataIndex: 'phone_number',
                width: 140,
                align: 'start',
                render: (_: unknown, record: ScienceIdUser) => (
                    <TableText text={formatPhoneNumber(record?.phone_number ?? '-')} disabled />
                ),
            },
            {
                title: <TableHeaderText text="Ro'yxatdan o'tgan sana" />,
                dataIndex: 'registered_at',
                width: 140,
                align: 'start',
                render: (_: unknown, record: ScienceIdUser) => (
                    <TableText
                        text={
                            record?.registered_at
                                ? fullDateTimeFormat(record?.registered_at)
                                : '-'
                        }
                        disabled />
                ),
            },
            {
                title: <TableHeaderText text='' />,
                dataIndex: 'actions',
                width: 40,
                align: 'end',
                render: (_: unknown, record: ScienceIdUser) => (
                    <TableAction
                        onView={() => handleView(record?.id)}
                    />
                ),
            },
        ],
        [pagination.page, pagination.pageSize, handleView]
    );
};
