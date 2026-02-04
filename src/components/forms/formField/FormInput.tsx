import React from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from 'antd'

interface FormInputProps {
    label: string
    required?: boolean
    value?: string | number
    onChange?: (value: string | number) => void
    placeholder?: string
    disabled?: boolean
    loading?: boolean
    type?: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url'
    size?: 'small' | 'middle' | 'large'
    className?: string
    maxLength?: number
    min?: number
    max?: number
    allowClear?: boolean
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    required,
    value,
    onChange,
    placeholder,
    disabled = false,
    loading = false,
    type = 'text',
    size = 'large',
    className,
    maxLength,
    min,
    max,
    allowClear = true,
}) => {
    const isNumberType = type === 'number'

    return (
        <FormItem className={className || 'flex-1'}>
            <FormLabel className="text-lg font-medium text-black block mb-2">
                {label}
                {required && <span className="text-red">*</span>}
            </FormLabel>
            <FormControl>
                <Input
                    value={value === undefined || value === null ? '' : String(value)}
                    type={isNumberType ? 'text' : type}
                    className={`custom-input w-full text-base ${className || ''}`}
                    size={size}
                    style={{
                        height: size === 'large' ? '48px' : size === 'middle' ? '40px' : '32px',
                        borderRadius: '1px',
                        fontSize: '16px',
                    }}
                    placeholder={placeholder}
                    disabled={disabled || loading}
                    onChange={(e) => {
                        if (isNumberType) {
                            const inputValue = e.target.value
                            const numericValue = inputValue.replace(/\D/g, '')
                            if (numericValue === '') {
                                onChange?.('')
                                return
                            }
                            const numValue = Number(numericValue)
                            if (min !== undefined && numValue < min) {
                                onChange?.(min)
                                return
                            }
                            if (max !== undefined && numValue > max) {
                                onChange?.(max)
                                return
                            }
                            onChange?.(numValue)
                        } else {
                            onChange?.(e.target.value)
                        }
                    }}
                    onKeyPress={(e) => {
                        if (isNumberType) {
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab' && e.key !== 'Enter') {
                                e.preventDefault()
                            }
                        }
                    }}
                    maxLength={maxLength}
                    allowClear={allowClear}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}

export default FormInput