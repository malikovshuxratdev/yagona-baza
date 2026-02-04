import React from 'react';
import { CenterModal, CenterModalContent, CenterModalHeader, CenterModalTitle } from '../ui/CenterModal';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    isPending?: boolean;
    variant?: 'danger' | 'warning' | 'info';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Tasdiqlash",
    description = "Haqiqatan ham ushbu ma'lumotni o'chirmoqchimisiz?",
    confirmText = "O'chirish",
    cancelText = "Bekor qilish",
    isPending = false,
    variant = 'danger'
}) => {
    return (
        <CenterModal open={isOpen} onOpenChange={onClose}>
            <CenterModalContent className="max-w-[400px] p-0 overflow-hidden">
                <CenterModalHeader>
                    <div className="flex items-center gap-2">
                        {variant === 'danger' && <AlertTriangle className="w-5 h-5 text-red" />}
                        <CenterModalTitle>{title}</CenterModalTitle>
                    </div>
                </CenterModalHeader>
                <div className="p-6">
                    <p className="text-gray-600 mb-6">{description}</p>
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isPending}
                        >
                            {cancelText}
                        </Button>
                        <Button
                            variant={variant === 'danger' ? 'destructive' : 'default'}
                            className={variant === 'danger' ? 'bg-red hover:bg-red/90 text-white' : ''}
                            onClick={onConfirm}
                            disabled={isPending}
                        >
                            {isPending ? "Kutilmoqda..." : confirmText}
                        </Button>
                    </div>
                </div>
            </CenterModalContent>
        </CenterModal>
    );
};
