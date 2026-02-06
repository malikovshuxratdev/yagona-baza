import React, { useCallback, useState } from 'react';
import { HeaderTitle, TableComponent } from '@/components';
import { useAcademWinnersQuery } from '@/hooks';
import type { AkademWinner } from '@/types';
import WinnerDetailModal from './components/WinnerDetailModal';
import { useWinnerProjectsColumns } from './components/columns';

const WinnerProjectsPage: React.FC = () => {
    const [winnerModalOpen, setWinnerModalOpen] = useState(false);
    const [selectedWinner, setSelectedWinner] = useState<AkademWinner | null>(null);

    const {
        resData,
        pagination,
        setPage,
        setPageSize,
        isLoading,
        isError,
    } = useAcademWinnersQuery();

    const handleView = useCallback((record: AkademWinner) => {
        setSelectedWinner(record);
        setWinnerModalOpen(true);
    }, []);

    const columns = useWinnerProjectsColumns({
        pagination,
        onView: handleView,
    });

    return (
        <div className="w-full space-y-4">
            <HeaderTitle title="Tanlov g'oliblari" total={pagination.total} />
            <div className="rounded-md border bg-card overflow-hidden">
                <div className="p-0">
                    <TableComponent<AkademWinner>
                        data={resData}
                        columns={columns}
                        isLoading={isLoading}
                        isError={isError}
                        rowKey="id"
                        pagination={pagination}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        emptyStateTitle="Ma'lumot yo'q"
                        emptyStateDescription="Tanlov g'oliblari topilmadi."
                        scroll={{ x: 800 }}
                    />
                </div>
            </div>
            <WinnerDetailModal
                open={winnerModalOpen}
                onOpenChange={setWinnerModalOpen}
                winner={selectedWinner}
            />
        </div>
    );
};

export default WinnerProjectsPage;
