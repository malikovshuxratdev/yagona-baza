import React, { useMemo, useState, useCallback } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
    Table as ShadcnTable,
    TableBody,
    TableCell,
    TableRow,
} from '@/components/ui/table';
import { Pagination } from '@/components/shared';
import { PageLoading } from '@/components/loader';
import { EmptyState } from '@/components/shared';
import { useReestrOrgClassStatisticsQuery, useReestrPassportTemplateStatisticsQuery } from '@/hooks';
import { getReestrLabelUz } from '@/constants';
import type {
    ReestrOrgClassStatisticsItem,
    ReestrPassportTemplateStatisticsItem,
} from '@/types';

const PARENT_PAGE_SIZE = 10;

function PassportTemplateRows({ org_class }: { org_class: string }) {
    const { data: items, isLoading, isError } = useReestrPassportTemplateStatisticsQuery(org_class);

    if (isLoading) {
        return (
            <div className="py-4 px-6 text-muted-foreground text-sm">
                Yuklanmoqda...
            </div>
        );
    }

    if (isError || !items?.length) {
        return (
            <div className="py-4 px-6 text-muted-foreground text-sm">
                Ma'lumot topilmadi
            </div>
        );
    }

    return (
        <div className="bg-muted/30 px-4 pb-4">
            <ShadcnTable>
                <TableBody>
                    {items.map((row: ReestrPassportTemplateStatisticsItem) => (
                        <TableRow key={row?.passport_template}>
                            <TableCell className="font-medium">{row.passport_template}</TableCell>
                            <TableCell>{getReestrLabelUz(row?.label)}</TableCell>
                            <TableCell className="text-right">{row?.count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </ShadcnTable>
        </div>
    );
}

const ReestrOrgClassTable: React.FC = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PARENT_PAGE_SIZE);

    const { data: orgClassData = [], isLoading, isError } = useReestrOrgClassStatisticsQuery();

    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return orgClassData.slice(start, start + pageSize);
    }, [orgClassData, page, pageSize]);

    const total = orgClassData.length;

    const handlePaginationChange = useCallback((newPage: number, newPageSize: number) => {
        setPage(newPage);
        setPageSize(newPageSize);
    }, []);

    const columns: ColumnsType<ReestrOrgClassStatisticsItem> = [
        {
            title: 'Class',
            dataIndex: 'org_class',
            key: 'org_class',
            width: 100,
            render: (value: string) => <span className="font-medium">{value}</span>,
        },
        {
            title: 'Nomi',
            dataIndex: 'label',
            key: 'label',
            render: (_: unknown, record: ReestrOrgClassStatisticsItem) => getReestrLabelUz(record.label),
        },
        {
            title: 'Soni',
            dataIndex: 'count',
            key: 'count',
            width: 100,
            align: 'right',
            render: (value: number) => value,
        },
    ];

    const expandable = {
        expandedRowRender: (record: ReestrOrgClassStatisticsItem) => (
            <PassportTemplateRows org_class={record.org_class} />
        ),
        rowExpandable: () => true,
        expandIcon: ({ expanded, onExpand, record }: { expanded: boolean; onExpand: (record: ReestrOrgClassStatisticsItem, e: React.MouseEvent<HTMLElement>) => void; record: ReestrOrgClassStatisticsItem }) => (
            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onExpand(record, e); }}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label={expanded ? 'Yopish' : 'Ochish'}
            >
                {expanded ? '−' : '+'}
            </button>
        ),
    };

    if (isLoading) {
        return <PageLoading />;
    }

    if (isError) {
        return (
            <EmptyState
                title="Xatolik yuz berdi"
                description="Statistikani yuklashda xatolik. Qayta urinib ko'ring."
            />
        );
    }

    return (
        <div className="space-y-4">
            <div className="rounded-md border bg-card overflow-hidden">
                <Table<ReestrOrgClassStatisticsItem>
                    rowKey="org_class"
                    columns={columns}
                    dataSource={paginatedData}
                    pagination={false}
                    size="middle"
                    expandable={expandable}
                    locale={{
                        emptyText: (
                            <EmptyState
                                title="Ma'lumot yo'q"
                                description="Tashkilot sinfi bo'yicha statistikalar topilmadi."
                            />
                        ),
                    }}
                    className="reestr-org-class-table"
                />
            </div>
            {total > pageSize && (
                <div className="flex justify-end">
                    <Pagination
                        current={page}
                        total={total}
                        pageSize={pageSize}
                        onChange={handlePaginationChange}
                        showSizeChanger
                    />
                </div>
            )}
        </div>
    );
};

export default ReestrOrgClassTable;
