import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { formatNumber } from '@/helpers';
import type { AkademWinner } from '@/types';

interface WinnerDetailModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    winner: AkademWinner | null;
}

const WinnerDetailModal: React.FC<WinnerDetailModalProps> = ({
    open,
    onOpenChange,
    winner,
}) => {
    if (!winner) return null;

    const { scientist, project_name, total_amount, receiver_organization, sender_organization } = winner;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                    <DialogTitle>Tanlov g'olibi</DialogTitle>
                </DialogHeader>
                <div className="space-y-5 py-2">
                    {/* Scientist */}
                    <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
                        <h4 className="mb-3 text-base font-semibold text-gray-700">Olim / Tadqiqotchi</h4>
                        <div className="space-y-2 text-base">
                            <p><span className="text-gray-500">F.I.O:</span> <span className="font-medium">{scientist?.full_name ?? '–'}</span></p>
                            <p><span className="text-gray-500">Science ID:</span> <span className="font-medium">{scientist?.science_id ?? '–'}</span></p>
                        </div>
                    </div>

                    {/* Project & Amount */}
                    <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
                        <h4 className="mb-3 text-base font-semibold text-gray-700">Loyiha va mablag'</h4>
                        <div className="space-y-2 text-base">
                            <p><span className="text-gray-500">Loyiha nomi:</span> <span className="font-medium">{project_name ?? '–'}</span></p>
                            <p><span className="text-gray-500">Ajratilgan summa:</span> <span className="font-medium">{formatNumber(total_amount)} so'm</span></p>
                        </div>
                    </div>

                    {/* Receiver organization */}
                    {receiver_organization && (
                        <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
                            <h4 className="mb-3 text-base font-semibold text-gray-700">Qabul qiluvchi tashkilot</h4>
                            <div className="space-y-2 text-base">
                                <p><span className="text-gray-500">Nomi:</span> <span className="font-medium">{receiver_organization.name ?? '–'}</span></p>
                                <p><span className="text-gray-500">STIR:</span> <span className="font-medium">{receiver_organization.tin ?? '–'}</span></p>
                                <p><span className="text-gray-500">Manzil:</span> <span className="font-medium">{receiver_organization.legal_address ?? '–'}</span></p>
                                <p><span className="text-gray-500">Hudud:</span> <span className="font-medium">{receiver_organization.region ?? '–'} {receiver_organization.district ? `, ${receiver_organization.district}` : ''}</span></p>
                            </div>
                        </div>
                    )}

                    {/* Sender organization */}
                    {sender_organization && (
                        <div className="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
                            <h4 className="mb-3 text-base font-semibold text-gray-700">Yuboruvchi tashkilot</h4>
                            <div className="space-y-2 text-base">
                                <p><span className="text-gray-500">Nomi:</span> <span className="font-medium">{sender_organization.name ?? '–'}</span></p>
                                <p><span className="text-gray-500">STIR:</span> <span className="font-medium">{sender_organization.tin ?? '–'}</span></p>
                                <p><span className="text-gray-500">Manzil:</span> <span className="font-medium">{sender_organization.legal_address ?? '–'}</span></p>
                                <p><span className="text-gray-500">Hudud:</span> <span className="font-medium">{sender_organization.region ?? '–'} {sender_organization.district ? `, ${sender_organization.district}` : ''}</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WinnerDetailModal;
