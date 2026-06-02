import type { ColumnsType } from 'antd/es/table';
import type { OrgListItem } from '@/types';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ACADEMIC_TYPE_LABELS: Record<string, string> = {
    RESEARCH_INSTITUTE: "Ilmiy-tadqiqot instituti",
    HIGHER_EDU: "Oliy ta'lim muassasasi",
};

const OWNERSHIP_LABELS: Record<string, string> = {
    STATE: 'Davlat',
    PRIVATE: 'Xususiy',
    FOREIGN: 'Xorijiy',
    JOINT: 'Qo\'shma',
};

interface OrgColumnsOptions {
    pagination: { page: number; pageSize: number };
    onView: (id: number) => void;
}

export const useOrgTableColumns = ({ pagination, onView }: OrgColumnsOptions): ColumnsType<OrgListItem> => [
    {
        title: '#',
        key: 'index',
        width: 60,
        fixed: 'left',
        render: (_: unknown, __: OrgListItem, index: number) =>
            (pagination.page - 1) * pagination.pageSize + index + 1,
    },
    {
        title: 'Nomi',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        render: (name: string, record: OrgListItem) => (
            <div className="cursor-pointer" onClick={() => onView(record.id)}>
                <div className="font-medium text-blue-600 hover:text-blue-800 text-sm leading-tight hover:underline">
                    {name}
                </div>
                {record.short_name && record.short_name !== name && (
                    <div className="text-xs text-gray-500 mt-0.5 truncate max-w-[320px]">
                        {record.short_name}
                    </div>
                )}
            </div>
        ),
    },
    {
        title: 'STIR',
        dataIndex: 'tin',
        key: 'tin',
        width: 130,
        render: (tin: string) => (
            <span className="font-mono text-sm text-gray-700">{tin}</span>
        ),
    },
    {
        title: 'Turi',
        dataIndex: 'academic_type',
        key: 'academic_type',
        width: 200,
        render: (type: string) => {
            const isResearch = type === 'RESEARCH_INSTITUTE';
            return (
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isResearch
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                    }`}
                >
                    {ACADEMIC_TYPE_LABELS[type] ?? type}
                </span>
            );
        },
    },
    {
        title: 'Mulkchilik',
        dataIndex: 'ownership_type',
        key: 'ownership_type',
        width: 110,
        render: (type: string) => (
            <span className="text-sm text-gray-600">
                {OWNERSHIP_LABELS[type] ?? type}
            </span>
        ),
    },
    {
        title: '',
        key: 'action',
        width: 70,
        fixed: 'right',
        render: (_: unknown, record: OrgListItem) => (
            <Button
                size="sm"
                variant="ghost"
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 h-8 w-8 p-0"
                onClick={() => onView(record.id)}
            >
                <Eye className="w-4 h-4" />
            </Button>
        ),
    },
];
