import React from 'react'
import { Switch } from 'antd'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface FormSwitchProps {
    label: string
    required?: boolean
    value?: boolean
    onChange?: (value: boolean) => void
    disabled?: boolean
    loading?: boolean
    className?: string
    checkedChildren?: React.ReactNode
    unCheckedChildren?: React.ReactNode
    size?: 'small' | 'default'
}

const FormSwitch: React.FC<FormSwitchProps> = ({
    label,
    required,
    value = false,
    onChange,
    disabled = false,
    loading = false,
    className,
    checkedChildren,
    unCheckedChildren,
    size = 'default',
}) => {
    return (
        <FormItem className={className}>
            <FormLabel className="text-lg font-medium text-black block mb-2">
                {label}
                {required && <span className="text-red">*</span>}
            </FormLabel>
            <FormControl>
                <Switch
                    checked={value}
                    onChange={onChange}
                    disabled={disabled || loading}
                    checkedChildren={checkedChildren}
                    unCheckedChildren={unCheckedChildren}
                    className={className}
                    size={size}
                    style={{ width: '50px' }} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}

export default FormSwitch
