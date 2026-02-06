import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { HeaderTitle, TableComponent } from '@/components';
import { paths } from '@/routes';
import { useMemo } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { TableHeaderText, TableText, TableAction } from '@/components';
import { fullDateFormat } from '@/helpers';

interface InternshipApplicationListItem {
    id: number;
    applicant_name?: string;
    status?: string;
    created_at?: string;
}

const InternshipApplicationsPage: React.FC = () => {
    const navigate = useNavigate();

    const pagination = {
        page: 1,
        pageSize: 10,
        total: 0,
    };

    const columns: ColumnsType<InternshipApplicationListItem> = useMemo(
        () => [
            {
                title: <TableHeaderText text="№" />,
                dataIndex: 'id',
                width: 60,
                align: 'center',
                render: (_: unknown, __: InternshipApplicationListItem, index: number) => {
                    const pageIndex = (pagination.page - 1) * pagination.pageSize;
                    return pageIndex + index + 1;
                },
            },
            {
                title: <TableHeaderText text="Ariza raqami" />,
                dataIndex: 'id',
                key: 'id',
                width: 120,
                render: (id: number) => (
                    <TableText
                        text={id ? `#${id}` : '–'}
                        onClick={() => navigate(paths.INTERNSHIP_APPLICATION_VIEW.replace(':id', String(id)))}
                    />
                ),
            },
            {
                title: <TableHeaderText text="Murojaatchi" />,
                dataIndex: 'applicant_name',
                key: 'applicant_name',
                width: 200,
                render: (name: string) => <TableText text={name ?? '–'} disabled />,
            },
            {
                title: <TableHeaderText text="Holat" />,
                dataIndex: 'status',
                key: 'status',
                width: 120,
                render: (status: string) => <TableText text={status ?? '–'} disabled />,
            },
            {
                title: <TableHeaderText text="Sana" />,
                dataIndex: 'created_at',
                key: 'created_at',
                width: 140,
                render: (date: string) => (
                    <TableText text={date ? fullDateFormat(date) : '–'} disabled />
                ),
            },
            {
                title: <TableHeaderText text="" />,
                dataIndex: 'actions',
                width: 60,
                align: 'end',
                render: (_: unknown, record: InternshipApplicationListItem) => (
                    <TableAction
                        onView={() =>
                            navigate(paths.INTERNSHIP_APPLICATION_VIEW.replace(':id', String(record.id)))
                        }
                    />
                ),
            },
        ],
        [navigate, pagination.page, pagination.pageSize]
    );

    const setPage = useCallback((_page: number) => {}, []);
    const setPageSize = useCallback((_size: number) => {}, []);

    return (
        <div className="w-full space-y-4">
            <HeaderTitle title="Internship – Arizalar" total={pagination.total} />
            <div className="rounded-md border bg-card overflow-hidden">
                <div className="p-0">
                    <TableComponent<InternshipApplicationListItem>
                        data={[]}
                        columns={columns}
                        isLoading={false}
                        isError={false}
                        pagination={pagination}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        rowKey="id"
                        emptyStateTitle="Ma'lumot yo'q"
                        emptyStateDescription="Stajirovka arizalari hali mavjud emas."
                        showSizeChanger
                        scroll={{ x: 700 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default InternshipApplicationsPage;
