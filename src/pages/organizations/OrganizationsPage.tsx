import React from 'react';
import { HeaderTitle, TableComponent } from '@/components';
import { useColumns } from './components';
import { useOrganizationListQuery } from '@/hooks';
import { useNavigate } from 'react-router';
import { paths } from '@/routes';

const OrganizationsPage: React.FC = () => {
    const navigate = useNavigate();
    const { resData, pagination, setPage, setPageSize, isLoading } = useOrganizationListQuery();

    const columns = useColumns({
        pagination,
        handleView: (tin: string) => {
            navigate(paths.ORGANIZATION_VIEW.replace(':tin', tin));
        },
        handleEdit: (id: number) => {
            navigate(paths.ORGANIZATION_EDIT.replace(':id', id.toString()));
        },
        handleDelete: (id: number) => {
            navigate(paths.ORGANIZATION_DELETE.replace(':id', id.toString()));
        }
    });

    const handleCreateOrganization = () => {
        navigate(paths.ORGANIZATION_CREATE);
    }

    return (
        <div>
            <HeaderTitle title="Tashkilotlar" onCreate={handleCreateOrganization} />
            <TableComponent
                data={resData}
                columns={columns}
                isLoading={isLoading}
                pagination={pagination}
                setPage={setPage}
                setPageSize={setPageSize}
                emptyStateTitle="Ma'lumotlar topilmadi"
                emptyStateDescription="Hozircha tashkilotlar ro'yxati bo'sh"
                rowKey="ID"
                scroll={{ x: 960 }}
            />
        </div>
    );
};

export default OrganizationsPage;
