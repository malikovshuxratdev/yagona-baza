import React from 'react'
import generatePicker from 'antd/es/date-picker/generatePicker'
import momentGenerateConfig from 'rc-picker/lib/generate/moment'
import { Calendar } from 'lucide-react'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import type { Moment } from 'moment'
import moment from 'moment'

const DatePicker = generatePicker<Moment>(momentGenerateConfig)

interface FormDateProps {
    label: string
    required?: boolean
    value?: string | Moment | null
    onChange?: (value: string | null) => void
    placeholder?: string
    disabled?: boolean
    loading?: boolean
    size?: 'small' | 'middle' | 'large'
    className?: string
    allowClear?: boolean
    format?: string
    showTime?: boolean
    picker?: 'date' | 'week' | 'month' | 'quarter' | 'year'
    disabledDate?: (current: Moment) => boolean
}

const FormDate: React.FC<FormDateProps> = ({
    label,
    required,
    value,
    onChange,
    placeholder,
    disabled = false,
    loading = false,
    size = 'large',
    className,
    allowClear = true,
    format = 'DD.MM.YYYY',
    showTime = false,
    picker = 'date',
    disabledDate,
}) => {
    const handleChange = (date: Moment | null) => {
        if (!onChange) return
        if (date) {
            onChange(date.toISOString())
        } else {
            onChange(null)
        }
    }

    const momentValue = value
        ? typeof value === 'string'
            ? moment(value)
            : moment(value)
        : null

    return (
        <FormItem className={className || 'flex-1'}>
            <FormLabel className="text-lg font-medium text-black block mb-2">
                {label}
                {required && <span className="text-red">*</span>}
            </FormLabel>
            <FormControl>
                <DatePicker
                    value={momentValue}
                    className={`custom-date-picker w-full text-base ${className || ''}`}
                    size={size}
                    style={{
                        height: size === 'large' ? '48px' : size === 'middle' ? '40px' : '32px',
                        borderRadius: '1px',
                        fontSize: '16px',
                        width: '100%',
                    }}
                    placeholder={placeholder}
                    disabled={disabled || loading}
                    onChange={handleChange}
                    format={format}
                    showTime={showTime}
                    picker={picker}
                    allowClear={allowClear}
                    disabledDate={disabledDate}
                    suffixIcon={<Calendar className="w-4 h-4 text-dark-gray" />}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}

export default FormDate