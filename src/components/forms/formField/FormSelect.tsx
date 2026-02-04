import React from 'react'
import { Select } from 'antd'
import { ChevronDown } from 'lucide-react'
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import './FormSelect.css'

interface SelectOption {
    label: string
    value: number | string
}

interface FormSelectProps {
    label: string
    required?: boolean
    value?: number | string
    onChange?: (value: number | string) => void
    options?: SelectOption[]
    placeholder?: string
    loading?: boolean
    disabled?: boolean
    allowClear?: boolean
    filterOption?: boolean | ((input: string, option: SelectOption) => boolean)
    suffixIcon?: React.ReactNode
    size?: 'small' | 'middle' | 'large'
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
    className?: string
}

const FormSelect: React.FC<FormSelectProps> = ({
    label,
    required,
    value,
    onChange,
    options = [],
    placeholder,
    loading = false,
    disabled = false,
    allowClear = true,
    filterOption = true,
    suffixIcon,
    size = 'large',
    getPopupContainer,
    className,
}) => {
    return (
        <FormItem className={`flex-1 ${className || ''}`}>
            <FormLabel className="text-lg font-medium text-black block mb-2">
                {label}
                {required && <span className="text-red">*</span>}
            </FormLabel>
            <FormControl>
                <Select
                    value={value}
                    className={`custom-select w-full text-base ${className || ''}`}
                    size={size}
                    style={{
                        height: size === 'large' ? '48px' : size === 'middle' ? '40px' : '32px',
                        borderRadius: '1px',
                        fontSize: '16px',
                    }}
                    placeholder={placeholder}
                    loading={loading}
                    disabled={disabled || loading}
                    suffixIcon={
                        suffixIcon || (
                            <ChevronDown className="w-4 h-4 text-dark-gray" />
                        )
                    }
                    options={options}
                    onChange={(value) => onChange?.(value)}
                    getPopupContainer={getPopupContainer}
                    filterOption={
                        typeof filterOption === 'function'
                            ? (input: string, option?: SelectOption) =>
                                filterOption(input, option as SelectOption)
                            : filterOption
                    }
                    allowClear={allowClear}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}

export default FormSelect