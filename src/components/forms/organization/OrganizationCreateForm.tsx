import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormField } from '@/components/ui/form';
import { FormInput, FormSelect, FormSwitch } from '@/components/forms/formField';
import { useOrganizationFindQuery, useOrganizationUpdateMutation } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Search, UserCircle } from 'lucide-react';
import { OrganizationListItem } from '@/types';
import { Input } from 'antd';
import { FormItem, FormLabel } from '@/components/ui/form';

interface OrganizationCreateFormProps {
    onSuccess?: () => void
    onCancel?: () => void
}

interface OrganizationFormData {
    id: number
    admin_id: number
    supervisor_id: number
    email: string
    phone_number: string
    legal_form: string
    ownership_form: string
    is_active: boolean
    taxRate: number
}

const OrganizationCreateForm: React.FC<OrganizationCreateFormProps> = ({ onSuccess, onCancel }) => {
    const [searchTin, setSearchTin] = useState('');
    const [isSearchEnabled, setIsSearchEnabled] = useState(false);
    const [foundOrganization, setFoundOrganization] = useState<OrganizationListItem | null>(null);

    const { data: findResult, isLoading: isFinding, error: findError } = useOrganizationFindQuery(
        searchTin,
        { enabled: isSearchEnabled && searchTin.length >= 9 }
    );
    const { mutate: updateOrganization, isPending: isUpdating } = useOrganizationUpdateMutation();

    // Admin search state
    const form = useForm<OrganizationFormData>({
        defaultValues: {
            id: 0,
            admin_id: undefined,
            supervisor_id: undefined,
            email: '',
            phone_number: '',
            legal_form: '',
            ownership_form: '',
            is_active: true,
            taxRate: undefined,
        },
    });

    // Handle search result
    useEffect(() => {
        if (findResult?.data) {
            setFoundOrganization(findResult.data);
            setIsSearchEnabled(false);

            // Update form with found data
            form.reset({
                id: findResult.data.ID,
                admin_id: findResult.data.admin_id || 0,
                supervisor_id: findResult.data.supervisor_id || 0,
                email: findResult.data.email !== 'string' ? findResult.data.email : '',
                phone_number: findResult.data.phone_number || '',
                legal_form: findResult.data.legal_form !== 'string' ? findResult.data.legal_form : '',
                ownership_form: findResult.data.ownership_form !== 'string' ? findResult.data.ownership_form : '',
                is_active: findResult.data.is_active,
            });
        }
    }, [findResult, form]);

    // Handle search error
    useEffect(() => {
        if (findError) {
            toast.error("Tashkilot topilmadi");
            setIsSearchEnabled(false);
        }
    }, [findError]);

    const handleSearch = () => {
        if (searchTin.length >= 9) {
            setIsSearchEnabled(true);
            setFoundOrganization(null);
        } else {
            toast.error("STIR kamida 9 ta raqamdan iborat bo'lishi kerak");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const onSubmit = (data: OrganizationFormData) => {
        updateOrganization(data, {
            onSuccess: () => {
                toast.success("Tashkilot muvaffaqiyatli ro'yxatga olindi");
                onSuccess?.();
            },
            onError: () => {
                toast.error("Xatolik yuz berdi");
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                {/* Search Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* TIN Search */}
                    <FormItem className="flex-1">
                        <FormLabel className="text-lg font-medium text-black block mb-2">
                            STIR <span className="text-red">*</span>
                        </FormLabel>
                        <div className="flex gap-3">
                            <Input
                                value={searchTin}
                                onChange={(e) => setSearchTin(e.target.value.replace(/\D/g, ''))}
                                onKeyDown={handleKeyDown}
                                placeholder="STIR kiriting..."
                                className="custom-input"
                                size="large"
                                style={{ height: '48px', fontSize: '16px' }}
                                maxLength={9}
                                allowClear
                            />
                            <Button
                                type="button"
                                onClick={handleSearch}
                                disabled={isFinding || searchTin.length < 9}
                                className="bg-blue text-white hover:opacity-90 h-12 px-6"
                            >
                                {isFinding ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Search className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                    </FormItem>

                    {/* Organization Name Display */}
                    <FormItem className="flex-1">
                        <FormLabel className="text-lg font-medium text-black block mb-2">
                            Tashkilot nomi
                        </FormLabel>
                        <div className="h-12 px-4 flex items-center bg-gray-50 border border-gray-200 rounded text-base">
                            {foundOrganization?.name ?? "-"}
                        </div>
                    </FormItem>
                </div>

                {/* Admin Search Section */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FormItem className="flex-1">
                        <FormLabel className="text-lg font-medium text-black block mb-2">
                            <span className="flex items-center gap-2">
                                <UserCircle className="w-5 h-5" />
                                Ijrochini tanlang (Science ID)
                            </span>
                        </FormLabel>
                        <div className="flex gap-3">
                            <Input
                                value={''} // TODO: add search science id
                                onChange={(e) => { }} // TODO: add search science id
                                onKeyDown={handleKeyDown} // TODO: add search science id
                                placeholder="OAN-1025-0002" // TODO: add search science id
                                className="custom-input" // TODO: add search science id
                                size="large" // TODO: add search science id
                                style={{ height: '48px', fontSize: '16px' }} // TODO: add search science id
                                allowClear // TODO: add search science id
                            />
                            <Button
                                type="button"
                                onClick={handleSearch}
                                disabled={false} // TODO: add search science id
                                className="bg-blue text-white hover:opacity-90 h-12 px-6"
                            >
                                {isFinding ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Search className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                    </FormItem>

                    {/* Found Admin Display */}
                    <FormItem className="flex-1">
                        <FormLabel className="text-lg font-medium text-black block mb-2">
                            Tanlangan admin
                        </FormLabel>
                        {false ? ( // TODO: add found admin
                            <div className="h-12 px-4 flex items-center gap-3 bg-green-50 border border-green-200 rounded">
                                <div>
                                    <span className="font-medium">Admin</span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-12 px-4 flex items-center bg-gray-50 border border-gray-200 rounded text-base text-gray-400">
                                Admin tanlanmagan
                            </div>
                        )}
                    </FormItem>
                </div>

                {/* Form Fields */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="supervisor_id"
                        render={({ field }) => (
                            <FormSelect
                                label="Yuqori turuvchi tashkilot"
                                value={field.value?.toString()}
                                onChange={(val) => field.onChange(Number(val))}
                                options={[]} // TODO: add supervisors
                                placeholder="Yuqori turuvchi tashkilotni tanlang"
                                disabled={false} // TODO: add supervisors
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormInput
                                label="Telefon raqami"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="+998 90 123 45 67"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormInput
                                label="Email"
                                type="email"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="email@example.com"
                            />
                        )}
                    />
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="legal_form"
                        render={({ field }) => (
                            <FormInput
                                label="Huquqiy shakli"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Masalan: DM, MChJ..."
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ownership_form"
                        render={({ field }) => (
                            <FormInput
                                label="Mulkchilik shakli"
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Masalan: Davlat, Xususiy..."
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="is_active"
                        render={({ field }) => (
                            <FormSwitch
                                label="Holati"
                                value={field.value}
                                onChange={field.onChange}
                                className="w-[50px]"
                            />
                        )}
                    />
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="taxRate"
                        render={({ field }) => (
                            <FormInput
                                label="Soliq stavkasi (%)"
                                type="number"
                                value={field.value}
                                onChange={(val) => field.onChange(Number(val))}
                                placeholder="Soliq foizi"
                                min={0}
                                max={100}
                            />
                        )}
                    />
                </div>

                {/* Submit Section */}
                <div className="mt-6 flex justify-end gap-3">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isUpdating}
                        >
                            Bekor qilish
                        </Button>
                    )}
                    <Button
                        type="submit"
                        variant="default"
                        className="bg-blue text-white hover:opacity-90 min-w-[160px]"
                        disabled={isUpdating || !foundOrganization}
                    >
                        {isUpdating ? "Saqlanmoqda..." : "Ro'yxatga olish"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default OrganizationCreateForm;
