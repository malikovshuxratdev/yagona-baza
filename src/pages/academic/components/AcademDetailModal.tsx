import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { formatNumber } from '@/helpers';
import type { AkademStatisticsResponse } from '@/types';

interface AcademDetailModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: AkademStatisticsResponse | null | undefined;
}

const AcademDetailModal: React.FC<AcademDetailModalProps> = ({
    open,
    onOpenChange,
    data,
}) => {
    const items = [
        { label: "O'tkazilgan tanlovlar", value: formatNumber(data?.contests ?? 0), suffix: 'ta' },
        { label: 'Kelib tushgan arizalar', value: formatNumber(data?.applications ?? 0), suffix: 'ta' },
        { label: "G'olib deb topilgan loyihalar", value: formatNumber(data?.winner_applications ?? 0), suffix: 'ta' },
        { label: "Jami ajratilgan mablag'", value: formatNumber(data?.funding_amount ?? 0), suffix: "so'm" },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Akademik statistika (batafsil)</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                    {items.map(({ label, value, suffix }) => (
                        <div
                            key={label}
                            className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3"
                        >
                            <span className="text-sm text-gray-600">{label}</span>
                            <span className="font-semibold text-gray-900">
                                {value} {suffix}
                            </span>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AcademDetailModal;
