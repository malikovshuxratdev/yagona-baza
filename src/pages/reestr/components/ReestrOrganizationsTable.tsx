import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { HeaderTitle, TableComponent } from '@/components';
import { useReestrOrganizationListQuery } from '@/hooks';
import { paths } from '@/routes';
import ReestrOrganizationsTableHeader from './ReestrOrganizationsTableHeader';
import { useReestrOrganizationColumns } from './columns';
import type { ReestrOrganizationListItem } from '@/types';

const ReestrOrganizationsTable: React.FC = () => {
    const navigate = useNavigate();
    const {
        resData,
        pagination,
        nameSearch,
        tinSearch,
        setPage,
        setPageSize,
        setNameSearch,
        setTinSearch,
        isLoading,
        isError,
    } = useReestrOrganizationListQuery();

    const columns = useReestrOrganizationColumns({
        pagination,
        handleView: (id: number) => {
            navigate(paths.REESTR_ORGANIZATION_VIEW.replace(':id', id.toString()));
        },
    });

    const handleNameSearchClear = useCallback(() => setNameSearch(''), [setNameSearch]);
    const handleTinSearchClear = useCallback(() => setTinSearch(''), [setTinSearch]);

    return (
        <div className="w-full space-y-4">
            <HeaderTitle title="Tashkilotlar" total={pagination.total} />
            <div className="rounded-md border bg-card overflow-hidden">
                <div className="p-4 border-b bg-muted/30">
                    <ReestrOrganizationsTableHeader
                        nameSearch={nameSearch}
                        tinSearch={tinSearch}
                        onNameSearchChange={setNameSearch}
                        onTinSearchChange={setTinSearch}
                        onNameSearchClear={handleNameSearchClear}
                        onTinSearchClear={handleTinSearchClear}
                    />
                </div>
                <div className="p-0">
                    <TableComponent<ReestrOrganizationListItem>
                        data={resData}
                        columns={columns}
                        isLoading={isLoading}
                        isError={isError}
                        pagination={pagination}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        rowKey="id"
                        emptyStateTitle="Ma'lumot yo'q"
                        emptyStateDescription="Tashkilotlar topilmadi. Qidiruv parametrlarini o'zgartiring."
                        showSizeChanger
                        scroll={{ x: 900 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReestrOrganizationsTable;
