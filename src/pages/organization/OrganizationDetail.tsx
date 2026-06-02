import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { HeaderTitle, PageLoading } from '@/components';
import { useOrganizationDetailQuery } from '@/hooks';
import { paths } from '@/routes';
import { fullDateFormat } from '@/helpers';
import type {
    OrgDetailResponse,
    OrgDirector,
    OrgAddress,
    OrgFounder,
    OrgDoctorate,
    OrgAcademicMobility,
    OrgInternship,
    OrgLaboratory,
} from '@/types';
import { DC_TYPE_LABELS, DOCTORATE_COURSE_LABELS, DcType, DoctorateCourse } from '@/types';
import {
    Building2,
    User,
    MapPin,
    Users,
    GraduationCap,
    FlaskConical,
    BookOpen,
    Plane,
} from 'lucide-react';

const ACADEMIC_TYPE_LABELS: Record<string, string> = {
    RESEARCH_INSTITUTE: "Ilmiy-tadqiqot instituti",
    HIGHER_EDU: "Oliy ta'lim muassasasi",
};

const OWNERSHIP_LABELS: Record<string, string> = {
    STATE: 'Davlat',
    PRIVATE: 'Xususiy',
    FOREIGN: 'Xorijiy',
    JOINT: "Qo'shma",
};


const InfoRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="flex flex-wrap items-start justify-between gap-2 py-2.5 border-b border-gray-100 last:border-b-0">
        <span className="text-sm text-gray-500 min-w-[120px]">{label}</span>
        <span className="text-sm font-medium text-gray-900 text-right flex-1">
            {value ?? <span className="text-gray-400">—</span>}
        </span>
    </div>
);

const SectionCard: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    badge?: string | number;
    color?: string;
}> = ({ title, icon, children, badge, color = 'blue' }) => {
    const colorMap: Record<string, string> = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100',
        green: 'bg-green-50 text-green-600 border-green-100',
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
        rose: 'bg-rose-50 text-rose-600 border-rose-100',
        teal: 'bg-teal-50 text-teal-600 border-teal-100',
    };
    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 bg-gray-50/60">
                <div className={`p-1.5 rounded-lg border ${colorMap[color] ?? colorMap.blue}`}>
                    {icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
                {badge !== undefined && (
                    <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        {badge}
                    </span>
                )}
            </div>
            <div className="px-5 py-1">{children}</div>
        </div>
    );
};

const AcademicTypeBadge: React.FC<{ type: string }> = ({ type }) => {
    const isResearch = type === 'RESEARCH_INSTITUTE';
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                isResearch ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
            }`}
        >
            {ACADEMIC_TYPE_LABELS[type] ?? type}
        </span>
    );
};

const DC_TYPE_COLORS: Partial<Record<DcType, string>> = {
    [DcType.DOCTORATE]:                   'bg-blue-100 text-blue-800',
    [DcType.BASIC_DOCTORATE]:             'bg-indigo-100 text-indigo-800',
    [DcType.TRAINEE_RESEARCHER]:          'bg-sky-100 text-sky-800',
    [DcType.INDEPENDENT_DOCTORATE]:       'bg-violet-100 text-violet-800',
    [DcType.INDEPENDENT_BASIC_DOCTORATE]: 'bg-purple-100 text-purple-800',
    [DcType.TARGETED_DOCTORATE]:          'bg-teal-100 text-teal-800',
    [DcType.TARGETED_BASIC_DOCTORATE]:    'bg-emerald-100 text-emerald-800',
    [DcType.DOCTORATE_OUTSIDE]:           'bg-orange-100 text-orange-800',
    [DcType.BASIC_DOCTORATE_OUTSIDE]:     'bg-amber-100 text-amber-800',
    [DcType.TRAINEE_RESEARCHER_OUTSIDE]:  'bg-yellow-100 text-yellow-800',
    [DcType.DOCTORATE_FOREIGN]:           'bg-rose-100 text-rose-800',
    [DcType.BASIC_DOCTORATE_FOREIGN]:     'bg-red-100 text-red-800',
    [DcType.TRAINEE_RESEARCHER_FOREIGN]:  'bg-pink-100 text-pink-800',
};

const DoctorateSummary: React.FC<{ items: OrgDoctorate[] }> = ({ items }) => {
    if (!items.length) return <p className="text-sm text-gray-400 py-3">Ma'lumot mavjud emas</p>;

    const byType = items.reduce<Record<number, { courses: Record<number, number>; total: number }>>(
        (acc, d) => {
            if (!acc[d.type]) acc[d.type] = { courses: {}, total: 0 };
            acc[d.type].courses[d.course] = (acc[d.type].courses[d.course] ?? 0) + d.count;
            acc[d.type].total += d.count;
            return acc;
        },
        {}
    );

    return (
        <div className="space-y-3 py-2">
            {Object.entries(byType)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([typeStr, data]) => {
                    const dcType = Number(typeStr) as DcType;
                    const label = DC_TYPE_LABELS[dcType] ?? `Tur ${typeStr}`;
                    const badgeColor = DC_TYPE_COLORS[dcType] ?? 'bg-gray-100 text-gray-700';
                    return (
                        <div key={typeStr} className="rounded-lg border border-gray-100 p-3.5 bg-gray-50/40">
                            <div className="flex items-center justify-between mb-3">
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>
                                    {label}
                                </span>
                                <span className="bg-white border border-gray-200 text-gray-700 text-xs px-2.5 py-0.5 rounded-full font-bold">
                                    Jami: {data.total} ta
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(data.courses)
                                    .sort(([a], [b]) => Number(a) - Number(b))
                                    .map(([courseStr, count]) => {
                                        const course = Number(courseStr) as DoctorateCourse;
                                        const courseLabel = DOCTORATE_COURSE_LABELS[course] ?? `${courseStr}-kurs`;
                                        return (
                                            <div
                                                key={courseStr}
                                                className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5"
                                            >
                                                <span className="text-xs text-gray-500">{courseLabel}:</span>
                                                <span className="text-xs font-bold text-gray-800">{count} ta</span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

const MobilityOrInternshipSummary: React.FC<{
    items: (OrgAcademicMobility | OrgInternship)[];
}> = ({ items }) => {
    if (!items.length) return <p className="text-sm text-gray-400 py-3">Ma'lumot mavjud emas</p>;

    return (
        <div className="space-y-2 py-2">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 border border-gray-100 px-4 py-2.5"
                >
                    <div className="flex gap-4 text-sm text-gray-600">
                        <span>Yil: <b className="text-gray-800">{item.year}</b></span>
                        <span>Tur: <b className="text-gray-800">{item.type}</b></span>
                        <span>Kurs: <b className="text-gray-800">{item.course}</b></span>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                        {item.count} ta
                    </span>
                </div>
            ))}
        </div>
    );
};

const OrganizationDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useOrganizationDetailQuery(Number(id));

    if (isLoading) return <PageLoading />;

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
                <p className="text-gray-500">Ma'lumot topilmadi yoki xatolik yuz berdi.</p>
                <button
                    type="button"
                    onClick={() => navigate(paths.ORG_LIST)}
                    className="text-blue-600 hover:underline text-sm"
                >
                    Ro'yxatga qaytish
                </button>
            </div>
        );
    }

    const d = data as OrgDetailResponse;
    const director = d.director as OrgDirector | null;
    const totalDoctorate = d.doctorate?.reduce((s, x) => s + x.count, 0) ?? 0;
    const totalLabs = d.laboratories?.reduce((s, x) => s + x.count, 0) ?? 0;

    return (
        <div className="space-y-5 pb-10">
            <HeaderTitle
                title={d.short_name || d.name}
                onBack={() => navigate(paths.ORG_LIST)}
            />

            {/* Hero card */}
            <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-blue-50/40 shadow-sm p-5">
                <div className="flex flex-wrap items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-base font-bold text-gray-900 leading-snug">{d.name}</h1>
                        {d.short_name && d.short_name !== d.name && (
                            <p className="text-sm text-gray-500 mt-0.5">{d.short_name}</p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-3">
                            <AcademicTypeBadge type={d.academic_type} />
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                {OWNERSHIP_LABELS[d.ownership_type] ?? d.ownership_type}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 font-mono">
                                STIR: {d.tin}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100">
                    <div className="text-center bg-white rounded-lg py-3 border border-gray-100">
                        <div className="text-xl font-bold text-indigo-600">{totalDoctorate}</div>
                        <div className="text-xs text-gray-500 mt-0.5">Doktorantlar</div>
                    </div>
                    <div className="text-center bg-white rounded-lg py-3 border border-gray-100">
                        <div className="text-xl font-bold text-emerald-600">{totalLabs}</div>
                        <div className="text-xs text-gray-500 mt-0.5">Laboratoriyalar</div>
                    </div>
                    <div className="text-center bg-white rounded-lg py-3 border border-gray-100">
                        <div className="text-xl font-bold text-blue-600">{d.founders?.length ?? 0}</div>
                        <div className="text-xs text-gray-500 mt-0.5">Asoschilar</div>
                    </div>
                    <div className="text-center bg-white rounded-lg py-3 border border-gray-100">
                        <div className="text-xl font-bold text-orange-600">{d.addresses?.length ?? 0}</div>
                        <div className="text-xs text-gray-500 mt-0.5">Manzillar</div>
                    </div>
                </div>
            </div>

            {/* Main info */}
            <SectionCard title="Asosiy ma'lumotlar" icon={<Building2 className="w-4 h-4" />} color="blue">
                <InfoRow label="To'liq nomi" value={d.name} />
                <InfoRow label="Qisqa nomi" value={d.short_name} />
                <InfoRow label="STIR" value={<span className="font-mono">{d.tin}</span>} />
                <InfoRow label="Turi" value={<AcademicTypeBadge type={d.academic_type} />} />
                <InfoRow
                    label="Mulkchilik"
                    value={OWNERSHIP_LABELS[d.ownership_type] ?? d.ownership_type}
                />
                <InfoRow label="OKED" value={d.oked} />
                <InfoRow label="OPF" value={d.opf} />
                <InfoRow label="KFS" value={d.kfs} />
                <InfoRow label="SOOGU" value={d.soogu} />
                <InfoRow
                    label="Ro'yxatga olingan"
                    value={d.created_at ? fullDateFormat(d.created_at) : null}
                />
            </SectionCard>

            {/* Director */}
            {director && (
                <SectionCard title="Rahbar" icon={<User className="w-4 h-4" />} color="purple">
                    <InfoRow
                        label="F.I.Sh."
                        value={`${director.last_name} ${director.first_name} ${director.middle_name}`}
                    />
                    <InfoRow label="Telefon" value={director.phone ? `+${director.phone}` : null} />
                    <InfoRow label="Email" value={director.email} />
                    <InfoRow label="Manzil" value={director.address} />
                    {director.tin && (
                        <InfoRow label="STIR" value={<span className="font-mono">{director.tin}</span>} />
                    )}
                    {director.passport_series && director.passport_number && (
                        <InfoRow
                            label="Pasport"
                            value={`${director.passport_series} ${director.passport_number}`}
                        />
                    )}
                </SectionCard>
            )}

            {/* Addresses */}
            {d.addresses?.length > 0 && (
                <SectionCard
                    title="Manzillar"
                    icon={<MapPin className="w-4 h-4" />}
                    color="green"
                    badge={d.addresses.length}
                >
                    <div className="space-y-2 py-2">
                        {d.addresses.map((addr: OrgAddress) => (
                            <div
                                key={addr.id}
                                className="flex items-start gap-3 rounded-lg bg-gray-50 border border-gray-100 px-4 py-3"
                            >
                                <span
                                    className={`mt-0.5 text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${
                                        addr.type === 'billing'
                                            ? 'bg-amber-100 text-amber-800'
                                            : 'bg-sky-100 text-sky-800'
                                    }`}
                                >
                                    {addr.type === 'billing' ? 'Hisob' : 'Yetkazish'}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-800">{addr.street}</p>
                                    {addr.postcode && (
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Pochta: {addr.postcode}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            )}

            {/* Founders */}
            {d.founders?.length > 0 && (
                <SectionCard
                    title="Asoschilar"
                    icon={<Users className="w-4 h-4" />}
                    color="orange"
                    badge={d.founders.length}
                >
                    <div className="space-y-3 py-2">
                        {d.founders.map((f: OrgFounder) => {
                            const name =
                                f.type === 'legal'
                                    ? f.legal_name ?? f.legal_short_name
                                    : `${f.ind_last_name ?? ''} ${f.ind_first_name ?? ''} ${f.ind_middle_name ?? ''}`.trim();
                            const tin = f.type === 'legal' ? f.legal_tin : f.ind_tin;
                            return (
                                <div
                                    key={f.id}
                                    className="rounded-lg border border-gray-100 p-4 bg-gray-50/40"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <p className="text-sm font-medium text-gray-900 flex-1">{name}</p>
                                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0">
                                            {f.share_percent}%
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                        {tin && <span>STIR: <b className="text-gray-700 font-mono">{tin}</b></span>}
                                        <span>
                                            Tur:{' '}
                                            <b className="text-gray-700">
                                                {f.type === 'legal' ? 'Yuridik shaxs' : 'Jismoniy shaxs'}
                                            </b>
                                        </span>
                                        {f.share_sum > 0 && (
                                            <span>
                                                Ulush summasi: <b className="text-gray-700">{f.share_sum.toLocaleString()}</b>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </SectionCard>
            )}

            {/* Doctorate */}
            <SectionCard
                title="Doktorantura"
                icon={<GraduationCap className="w-4 h-4" />}
                color="teal"
                badge={totalDoctorate}
            >
                <DoctorateSummary items={d.doctorate ?? []} />
            </SectionCard>

            {/* Academic Mobility */}
            <SectionCard
                title="Akademik mobillik"
                icon={<Plane className="w-4 h-4" />}
                color="purple"
                badge={d.academic_mobility?.length ?? 0}
            >
                <MobilityOrInternshipSummary items={d.academic_mobility ?? []} />
            </SectionCard>

            {/* Internships */}
            <SectionCard
                title="Stajirovkalar"
                icon={<BookOpen className="w-4 h-4" />}
                color="orange"
                badge={d.internships?.length ?? 0}
            >
                <MobilityOrInternshipSummary items={d.internships ?? []} />
            </SectionCard>

            {/* Laboratories */}
            {(d.laboratories?.length ?? 0) > 0 && (
                <SectionCard
                    title="Laboratoriyalar"
                    icon={<FlaskConical className="w-4 h-4" />}
                    color="green"
                    badge={totalLabs}
                >
                    <div className="space-y-2 py-2">
                        {d.laboratories.map((lab: OrgLaboratory) => (
                            <div
                                key={lab.id}
                                className="flex items-center justify-between rounded-lg bg-gray-50 border border-gray-100 px-4 py-2.5"
                            >
                                <span className="text-sm text-gray-600">
                                    Yil: <b className="text-gray-800">{lab.year}</b>
                                </span>
                                <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                                    {lab.count} ta
                                </span>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            )}
        </div>
    );
};

export default OrganizationDetail;
