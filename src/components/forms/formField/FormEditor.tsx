import React from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import QuillEditor from '@/components/shared/QuillEditor'

interface FormEditorProps {
    label: string
    required?: boolean
    value?: string
    onChange?: (value: string) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    maxWords?: number
}

const FormEditor: React.FC<FormEditorProps> = ({
    label,
    required,
    value,
    onChange,
    placeholder,
    disabled = false,
    className,
    maxWords = 1000,
}) => {
    return (
        <FormItem className={className || 'w-full'}>
            <FormLabel className="text-lg font-medium text-black block mb-2">
                {label}
                {required && <span className="text-red">*</span>}
            </FormLabel>
            <FormControl>
                <QuillEditor
                    value={value || ''}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={disabled}
                    maxWords={maxWords}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}

export default FormEditor
