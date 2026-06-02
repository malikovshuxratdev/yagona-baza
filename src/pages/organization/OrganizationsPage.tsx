import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { HeaderTitle, TableComponent } from '@/components';
import { useOrganizationListQuery } from '@/hooks';
import { paths } from '@/routes';
import { OrgListFilters, useOrgTableColumns } from './components';
import type { OrgListItem } from '@/types';

const OrganizationsPage: React.FC = () => {
    const navigate = useNavigate();
    const {
        items,
        pagination,
        params,
        setPage,
        setPageSize,
        setName,
        setTin,
        setAcademicType,
        isLoading,
        isError,
    } = useOrganizationListQuery();

    const handleView = useCallback(
        (id: number) => navigate(paths.ORG_DETAIL.replace(':id', String(id))),
        [navigate]
    );

    const columns = useOrgTableColumns({ pagination, onView: handleView });

    return (
        <div className="w-full space-y-4">
            <HeaderTitle title="Tashkilotlar" total={pagination.total} />

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                    <OrgListFilters
                        name={params.name ?? ''}
                        tin={params.tin ?? ''}
                        academicType={params.academic_type ?? ''}
                        onNameChange={setName}
                        onTinChange={setTin}
                        onAcademicTypeChange={setAcademicType}
                    />
                </div>

                <TableComponent<OrgListItem>
                    data={items}
                    columns={columns}
                    isLoading={isLoading}
                    isError={isError}
                    pagination={{ page: pagination.page, pageSize: pagination.pageSize, total: pagination.total }}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    rowKey="id"
                    emptyStateTitle="Tashkilotlar topilmadi"
                    emptyStateDescription="Qidiruv parametrlarini o'zgartiring."
                    showSizeChanger
                    scroll={{ x: 900 }}
                />
            </div>
        </div>
    );
};

export default OrganizationsPage;
