import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ReestrOrganizationsTableHeaderProps {
    nameSearch: string;
    tinSearch: string;
    onNameSearchChange: (value: string) => void;
    onTinSearchChange: (value: string) => void;
    onNameSearchClear: () => void;
    onTinSearchClear: () => void;
}

const ReestrOrganizationsTableHeader: React.FC<ReestrOrganizationsTableHeaderProps> = ({
    nameSearch,
    tinSearch,
    onNameSearchChange,
    onTinSearchChange,
    onNameSearchClear,
    onTinSearchClear,
}) => {
    return (
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                    type="text"
                    placeholder="Nomi bo'yicha qidirish..."
                    value={nameSearch}
                    onChange={(e) => onNameSearchChange(e.target.value)}
                    className="pl-9 pr-9"
                />
                {nameSearch ? (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={onNameSearchClear}
                        aria-label="Tozalash"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                ) : null}
            </div>
            <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                    type="text"
                    placeholder="STIR bo'yicha qidirish..."
                    value={tinSearch}
                    onChange={(e) => onTinSearchChange(e.target.value)}
                    className="pl-9 pr-9"
                />
                {tinSearch ? (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={onTinSearchClear}
                        aria-label="Tozalash"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default ReestrOrganizationsTableHeader;
