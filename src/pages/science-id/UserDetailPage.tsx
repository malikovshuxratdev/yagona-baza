import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { HeaderTitle, PageLoading } from '@/components';
import { useScienceUserDetailQuery } from '@/hooks';
import { paths } from '@/routes';
import { formatPhoneNumber, fullDateFormat } from '@/helpers';

const DetailRow: React.FC<{
    label: string;
    value: string | number | boolean | null | undefined;
    className?: string;
}> = ({ label, value, className = '' }) => {
    const displayValue =
        value === null || value === undefined
            ? '—'
            : typeof value === 'boolean'
                ? value
                    ? 'Faol'
                    : 'Nofaol'
                : String(value);
    return (
        <div
            className={`flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-4 py-3 last:border-b-0 ${className}`}
        >
            <span className="text-sm font-medium text-gray-500">{label}</span>
            <span className="text-base text-gray-900">{displayValue}</span>
        </div>
    );
};

const UserDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useScienceUserDetailQuery(Number(id));

    const handleBack = () => {
        navigate(paths.USERS);
    };

    if (isLoading) {
        return <PageLoading />;
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-600">Ma'lumot topilmadi yoki xatolik yuz berdi.</p>
                <button
                    type="button"
                    onClick={handleBack}
                    className="mt-4 text-primary-blue hover:underline"
                >
                    Ortga
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <HeaderTitle title={data?.full_name} onBack={handleBack} />

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                {data?.profile_image && (
                    <div className="flex justify-center border-b border-gray-100 p-4">
                        <img
                            src={
                                typeof data?.profile_image === 'string'
                                    ? data?.profile_image
                                    : data?.profile_image?.url ?? ''
                            }
                            alt={data?.full_name}
                            className="h-32 w-32 rounded-full object-cover"
                        />
                    </div>
                )}

                <div className="divide-y divide-gray-100">
                    <DetailRow
                        label="Science ID"
                        value={data?.science_id}
                        className="bg-gray-50/30"
                    />
                    <DetailRow label="F.I.O." value={data?.full_name} />
                    <DetailRow
                        label="Holat"
                        value={data?.live_status}
                        className="bg-gray-50/30"
                    />
                    <DetailRow label="Telefon" value={formatPhoneNumber(data?.phone_number)} />
                    <DetailRow
                        label="Email"
                        value={data?.email}
                        className="bg-gray-50/30"
                    />
                    <DetailRow
                        label="Ro'yxatdan o'tgan sana"
                        value={data?.registered_at ? fullDateFormat(data?.registered_at) : ''}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;
