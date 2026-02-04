import { useMemo } from "react"
import type { ColumnsType } from 'antd/es/table';
import { TableHeaderText, TableText, TableAction, StatusBadge } from "@/components";
import { OrganizationListItem } from "@/types";

interface UseColumnsProps {
    pagination: {
        page: number;
        pageSize: number;
        total: number;
    };
    handleView: (tin: string) => void;
    handleEdit: (id: number) => void;
    handleDelete: (id: number) => void;
}

export const useColumns = ({ pagination, handleView, handleEdit, handleDelete }: UseColumnsProps): ColumnsType<OrganizationListItem> => {
    return useMemo<ColumnsType<OrganizationListItem>>(
        () => [
            {
                title: (
                    <TableHeaderText text="№" />
                ),
                dataIndex: 'ID',
                width: 50,
                align: 'center',
                render: (_: unknown, __: unknown, index: number) => {
                    const pageIndex = (pagination.page - 1) * pagination.pageSize;
                    return pageIndex + index + 1;
                },
            },
            {
                title: (
                    <TableHeaderText text="STIR" />
                ),
                dataIndex: 'tin',
                width: 120,
                align: 'start',
                render: (text) => (
                    <TableText text={text} />
                ),
            },
            {
                title: (
                    <TableHeaderText text="Nomi" />
                ),
                dataIndex: 'name',
                width: 350,
                align: 'start',
                render: (val) => (
                    <div className="line-clamp-2">
                        <TableText text={val} />
                    </div>
                ),
            },
            {
                title: (
                    <TableHeaderText text="Rahbar" />
                ),
                dataIndex: 'director_last_name',
                width: 220,
                align: 'start',
                render: (_val, record) => {
                    const fullName = [
                        record.director_last_name,
                        record.director_first_name,
                        record.director_middle_name
                    ].filter(Boolean).join(' ');
                    return <TableText text={fullName} disabled />;
                },
            },
            {
                title: (
                    <TableHeaderText text="Manzil" />
                ),
                dataIndex: 'address',
                width: 200,
                align: 'start',
                render: (val) => (
                    <div className="line-clamp-2">
                        <TableText text={val} disabled />
                    </div>
                ),
            },
            {
                title: (
                    <TableHeaderText text="Holati" />
                ),
                dataIndex: 'is_active',
                width: 100,
                align: 'center',
                render: (val) => (
                    <div className="flex items-center justify-center">
                        <StatusBadge is_active={val} />
                    </div>
                ),
            },
            {
                dataIndex: 'actions',
                width: 30,
                align: 'end',
                render: (_: unknown, record: OrganizationListItem) => (
                    <TableAction
                        onView={() => handleView(record.tin)}
                        onEdit={() => handleEdit(record.ID)}
                        onDelete={() => handleDelete(record.ID)}
                    />
                ),
            }
        ],
        [pagination, handleView, handleEdit, handleDelete]
    );
};

