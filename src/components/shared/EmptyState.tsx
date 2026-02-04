import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    icon,
    className,
    action,
    size = 'md',
}) => {
    const sizeClasses = {
        sm: {
            container: 'py-8',
            icon: 'w-16 h-16 mb-3',
            title: 'text-base',
            description: 'text-xs',
        },
        md: {
            container: 'py-12',
            icon: 'w-24 h-24 mb-4',
            title: 'text-lg',
            description: 'text-sm',
        },
        lg: {
            container: 'py-16',
            icon: 'w-32 h-32 mb-6',
            title: 'text-xl',
            description: 'text-base',
        },
    };

    const currentSize = sizeClasses[size];

    const defaultIcon = (
        <svg
            className={cn('text-gray-300', currentSize.icon)}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
        </svg>
    );

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center text-center',
                currentSize.container,
                className
            )}
        >
            <div className="flex items-center justify-center mb-4">
                {icon || defaultIcon}
            </div>

            <h3
                className={cn(
                    'font-semibold text-gray-900 mb-2',
                    currentSize.title
                )}
            >
                {title}
            </h3>

            {description && (
                <p
                    className={cn(
                        'text-gray-500 max-w-sm',
                        currentSize.description
                    )}
                >
                    {description}
                </p>
            )}

            {action && <div className="mt-6">{action}</div>}
        </div>
    );
};

export default EmptyState;
