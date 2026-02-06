import React from 'react';
import { HeaderTitle, TableComponent } from '@/components';
import { useScienceUserQuery } from '@/hooks';
import { useScienceIdUserColumns } from './columns';
import { paths } from '@/routes';
import { useNavigate } from 'react-router';

const ScienceIdUserTable: React.FC = () => {
    const navigate = useNavigate();
    const { resData, pagination, setPage, setPageSize, isLoading, isError } =
        useScienceUserQuery();

    const columns = useScienceIdUserColumns({
        pagination, handleView: (id: number) => {
            navigate(paths.USER_DETAIL.replace(':id', id.toString()));
        }
    });

    return (
        <div className="w-full">
            <HeaderTitle title="Ilmiy-innovatsion faoliyat bilan shug’ullanuvchi jismoniy shaxslar" total={pagination.total} />
            <TableComponent
                data={resData}
                columns={columns}
                isLoading={isLoading}
                isError={isError}
                pagination={pagination}
                setPage={setPage}
                setPageSize={setPageSize}
                rowKey="id"
                emptyStateTitle="Foydalanuvchilar topilmadi"
                emptyStateDescription="Hozircha ro'yxat bo'sh"
                showSizeChanger
                scroll={{ x: 1040 }}
            />
        </div>
    );
};

export default ScienceIdUserTable;
