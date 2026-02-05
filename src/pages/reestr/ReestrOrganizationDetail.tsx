import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { HeaderTitle, PageLoading } from '@/components';
import { useReestrOrganizationDetailQuery } from '@/hooks';
import { paths } from '@/routes';
import { getReestrLabelUz } from '@/constants';
import { formatPhoneNumber, fullDateFormat } from '@/helpers';
import type {
    ReestrOrganizationDetailResponse,
    Director,
    Founder,
    BillingAddress,
} from '@/types';

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
                    ? 'Ha'
                    : "Yo'q"
                : String(value);
    return (
        <div
            className={`flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-4 py-3 last:border-b-0 ${className}`}
        >
            <span className="text-sm font-medium text-gray-500">{label}</span>
            <span className="text-base text-gray-900 text-right max-w-[60%]">{displayValue}</span>
        </div>
    );
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-0">
        {title}
    </h3>
);

const ReestrOrganizationDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useReestrOrganizationDetailQuery(Number(id));

    const handleBack = () => {
        navigate(paths.REESTR_ORGANIZATIONS);
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

    const d = data as ReestrOrganizationDetailResponse;

    return (
        <div className="space-y-6">
            <HeaderTitle title={d.name ?? d.short_name ?? `Tashkilot #${d.id}`} onBack={handleBack} />

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="px-4 py-3 bg-muted/30 border-b border-gray-200">
                    <SectionTitle title="Asosiy ma'lumotlar" />
                </div>
                <div className="divide-y divide-gray-100">
                    <DetailRow label="Qisqa nomi" value={d.short_name} className="bg-gray-50/30" />
                    <DetailRow label="STIR" value={d.tin} />
                    <DetailRow label="Status" value={d.status} className="bg-gray-50/30" />
                    <DetailRow
                        label="Tashkilot sinfi"
                        value={d.org_class ? getReestrLabelUz(d.org_class) : d.org_class}
                    />
                    <DetailRow
                        label="Passport template"
                        value={d.passport_template ? getReestrLabelUz(d.passport_template) : d.passport_template}
                        className="bg-gray-50/30"
                    />
                    <DetailRow
                        label="Ro'yxatdan o'tgan sana"
                        value={d.registration_date ? fullDateFormat(d.registration_date) : ''}
                    />
                    <DetailRow
                        label="Qo'shilgan sana"
                        value={d.created_at ? fullDateFormat(d.created_at) : ''}
                        className="bg-gray-50/30"
                    />
                    <DetailRow label="Manzil" value={d.address} />
                </div>
            </div>

            {d.director && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="px-4 py-3 bg-muted/30 border-b border-gray-200">
                        <SectionTitle title="Rahbar" />
                    </div>
                    <div className="divide-y divide-gray-100">
                        <DetailRow
                            label="F.I.O."
                            value={(d.director as Director).fullname}
                            className="bg-gray-50/30"
                        />
                        <DetailRow label="Telefon" value={formatPhoneNumber((d.director as Director).phone)} />
                        <DetailRow label="Email" value={(d.director as Director).email} className="bg-gray-50/30" />
                    </div>
                </div>
            )}

            {d.billing_address && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="px-4 py-3 bg-muted/30 border-b border-gray-200">
                        <SectionTitle title="Hisob-faktura manzili" />
                    </div>
                    <div className="divide-y divide-gray-100">
                        <DetailRow
                            label="Viloyat"
                            value={(d.billing_address as BillingAddress).district?.region?.name?.uz}
                            className="bg-gray-50/30"
                        />
                        <DetailRow
                            label="Tuman"
                            value={(d.billing_address as BillingAddress).district?.name?.uz}
                        />
                        <DetailRow label="Ko'cha" value={(d.billing_address as BillingAddress).street_name} className="bg-gray-50/30" />
                    </div>
                </div>
            )}

            {d.founders?.length > 0 && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="px-4 py-3 bg-muted/30 border-b border-gray-200">
                        <SectionTitle title="Asoschilar" />
                    </div>
                    <div className="divide-y divide-gray-100">
                        {d.founders.map((f: Founder, idx: number) => (
                            <div
                                key={`${f.tin}-${idx}`}
                                className={`space-y-0 ${idx % 2 === 0 ? 'bg-gray-50/30' : ''}`}
                            >
                                <DetailRow label="F.I.O. / Nomi" value={f.name} />
                                <DetailRow label="STIR" value={f.tin} />
                                <DetailRow label="Ulush (%)" value={f.share_percent} />
                                <DetailRow label="Ulush summasi" value={f.share_sum} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {(d.social?.telegram || d.social?.instagram || d.social?.facebook || d.social?.website) && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="px-4 py-3 bg-muted/30 border-b border-gray-200">
                        <SectionTitle title="Ijtimoiy tarmoqlar" />
                    </div>
                    <div className="divide-y divide-gray-100">
                        <DetailRow label="Telegram" value={d.social?.telegram} className="bg-gray-50/30" />
                        <DetailRow label="Instagram" value={d.social?.instagram} />
                        <DetailRow label="Facebook" value={d.social?.facebook} className="bg-gray-50/30" />
                        <DetailRow label="Veb-sayt" value={d.social?.website} />
                    </div>
                </div>
            )}

            {(d.phone || d.email || d.website) && (
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="px-4 py-3 bg-muted/30 border-b border-gray-200">
                        <SectionTitle title="Aloqa" />
                    </div>
                    <div className="divide-y divide-gray-100">
                        <DetailRow label="Telefon" value={formatPhoneNumber(d.phone)} className="bg-gray-50/30" />
                        <DetailRow label="Email" value={d.email} />
                        <DetailRow label="Veb-sayt" value={d.website} className="bg-gray-50/30" />
                        <DetailRow label="Faks" value={d.fax} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReestrOrganizationDetail;
