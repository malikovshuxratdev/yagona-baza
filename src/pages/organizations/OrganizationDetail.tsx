import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { HeaderTitle, StatusBadge } from '@/components';
import { useOrganizationDetailQuery } from '@/hooks';
import { paths } from '@/routes';
import { OrganizationDetailRow } from './components';

const OrganizationDetail: React.FC = () => {
    const navigate = useNavigate();
    const { tin } = useParams<{ tin: string }>();
    const { data: res, isLoading } = useOrganizationDetailQuery(tin);

    const handleBack = () => {
        navigate(paths.ORGANIZATIONS);
    };

    const handleEdit = () => {
        if (res?.data?.ID) {
            navigate(paths.ORGANIZATION_EDIT.replace(':id', res.data.ID.toString()));
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    const data = res?.data;

    if (!data) {
        return <div className="text-center py-20">Ma'lumot topilmadi</div>;
    }

    const directorFullName = [
        data.director_last_name,
        data.director_first_name,
        data.director_middle_name
    ].filter(Boolean).join(' ');

    return (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <HeaderTitle
                title="Tashkilot tafsilotlari"
                onBack={handleBack}
                onEdit={handleEdit}
            />

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <OrganizationDetailRow
                    label="STIR (TIN)"
                    value={data.tin}
                />
                <OrganizationDetailRow
                    label="To'liq nomi"
                    value={data.name}
                    className="bg-gray-50/30"
                />
                <OrganizationDetailRow
                    label="Qisqa nomi"
                    value={data.short_name}
                />
                <OrganizationDetailRow
                    label="Manzil"
                    value={data.address}
                    className="bg-gray-50/30"
                />
                <OrganizationDetailRow
                    label="Rahbar"
                    value={directorFullName}
                />
                <OrganizationDetailRow
                    label="Rahbar JSHSHIR"
                    value={data.director_pin}
                    className="bg-gray-50/30"
                />
                <OrganizationDetailRow
                    label="Telefon raqami"
                    value={data.phone_number}
                />
                <OrganizationDetailRow
                    label="Email"
                    value={data.email !== 'string' ? data.email : '-'}
                    className="bg-gray-50/30"
                />
                <OrganizationDetailRow
                    label="OKED"
                    value={data.oked}
                />
                <OrganizationDetailRow
                    label="SOOGU"
                    value={data.soogu}
                    className="bg-gray-50/30"
                />
                <OrganizationDetailRow
                    label="SOATO"
                    value={data.soato}
                />
                <OrganizationDetailRow
                    label="OPF"
                    value={data.opf}
                    className="bg-gray-50/30"
                />
                <OrganizationDetailRow
                    label="KFS"
                    value={data.kfs}
                />
                <OrganizationDetailRow
                    label="Holati"
                    value={<StatusBadge is_active={data.is_active} />}
                    isLast={true}
                    className="bg-gray-50/30"
                />
            </div>
        </div>
    );
};

export default OrganizationDetail;
