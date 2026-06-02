import React from 'react';
import { Search, X } from 'lucide-react';
import { Select } from 'antd';
import { Input } from '@/components/ui/input';
import type { AcademicType } from '@/types';

interface OrgListFiltersProps {
    name: string;
    tin: string;
    academicType: AcademicType | '';
    onNameChange: (v: string) => void;
    onTinChange: (v: string) => void;
    onAcademicTypeChange: (v: AcademicType | '') => void;
}

const ACADEMIC_OPTIONS = [
    { value: '', label: 'Barchasi' },
    { value: 'RESEARCH_INSTITUTE', label: "Ilmiy-tadqiqot instituti" },
    { value: 'HIGHER_EDU', label: "Oliy ta'lim muassasasi" },
];

const OrgListFilters: React.FC<OrgListFiltersProps> = ({
    name,
    tin,
    academicType,
    onNameChange,
    onTinChange,
    onAcademicTypeChange,
}) => {
    return (
        <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                <Input
                    className="pl-9 pr-8 h-9 text-sm"
                    placeholder="Nomi bo'yicha qidirish..."
                    value={name}
                    onChange={(e) => onNameChange(e.target.value)}
                />
                {name && (
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => onNameChange('')}
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            <div className="relative min-w-[140px] max-w-[180px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                <Input
                    className="pl-9 pr-8 h-9 text-sm font-mono"
                    placeholder="STIR..."
                    value={tin}
                    onChange={(e) => onTinChange(e.target.value.replace(/\D/g, '').slice(0, 9))}
                />
                {tin && (
                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => onTinChange('')}
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            <Select
                value={academicType}
                onChange={(v) => onAcademicTypeChange(v as AcademicType | '')}
                options={ACADEMIC_OPTIONS}
                style={{ width: 200, height: 36 }}
            />
        </div>
    );
};

export default OrgListFilters;
