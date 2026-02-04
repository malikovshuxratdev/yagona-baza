import React, { useMemo } from 'react'
import { TreeSelect } from 'antd'
import { ChevronDown } from 'lucide-react'
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import './FormMultiSelect.css'

interface TreeNode {
    title: string
    value: number | string
    key?: number | string
    children?: TreeNode[]
}

interface FormMultiSelectProps {
    label: string
    required?: boolean
    value?: (number | string)[]
    onChange?: (ids: (number | string)[]) => void
    treeData?: TreeNode[]
    placeholder?: string
    loading?: boolean
    disabled?: boolean
    treeCheckable?: boolean
    showCheckedStrategy?: 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD'
    showSearch?: boolean
    treeDefaultExpandAll?: boolean
    maxTagCount?: number | 'responsive'
    maxTagPlaceholder?: (omittedValues: any[]) => React.ReactNode
    suffixIcon?: React.ReactNode
    size?: 'small' | 'middle' | 'large'
    className?: string
    popupClassName?: string
    popupStyle?: React.CSSProperties
}

const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
    label,
    required,
    value = [],
    onChange,
    treeData = [],
    placeholder,
    loading = false,
    disabled = false,
    treeCheckable = true,
    showCheckedStrategy = 'SHOW_CHILD' as const,
    showSearch = true,
    treeDefaultExpandAll = true,
    maxTagCount = 'responsive',
    maxTagPlaceholder,
    suffixIcon,
    size = 'large',
    className,
    popupClassName,
    popupStyle,
}) => {
    const validIds = useMemo(() => {
        const ids = new Set<number | string>()
        treeData?.forEach((parent) => {
            ids.add(parent.value)
            parent.children?.forEach((child: TreeNode) => {
                ids.add(child.value)
            })
        })
        return ids
    }, [treeData])

    const filteredValue = useMemo(() => {
        if (!treeData || treeData.length === 0) return []
        return value.filter((id) => validIds.has(id))
    }, [value, validIds, treeData])

    return (
        <FormItem className={`flex-1 ${className || ''}`}>
            <FormLabel className="text-lg font-medium text-black block mb-2">
                {label}
                {required && <span className="text-red">*</span>}
            </FormLabel>
            <FormControl>
                <TreeSelect
                    treeData={treeData}
                    treeCheckable={treeCheckable}
                    showCheckedStrategy={showCheckedStrategy}
                    className={`custom-tree-select w-full text-base ${className || ''}`}
                    size={size}
                    style={{
                        minHeight: size === 'large' ? '48px' : size === 'middle' ? '40px' : '32px',
                        borderRadius: '1px',
                        fontSize: '16px',
                    }}
                    styles={{
                        popup: {
                            root: {
                                ...popupStyle,
                            },
                        },
                    }}
                    classNames={{
                        popup: {
                            root: `custom-tree-select-dropdown ${popupClassName || ''}`,
                        },
                    }}
                    placeholder={placeholder}
                    treeNodeFilterProp="title"
                    showSearch={showSearch}
                    loading={loading}
                    disabled={disabled || loading}
                    treeDefaultExpandAll={treeDefaultExpandAll}
                    maxTagCount={maxTagCount}
                    maxTagPlaceholder={maxTagPlaceholder as any}
                    suffixIcon={
                        suffixIcon || (
                            <ChevronDown className="w-4 h-4 text-dark-gray" />
                        )
                    }
                    value={filteredValue}
                    onChange={(selectedValues) => {
                        if (!onChange) return
                        const selectedIds = (selectedValues as (number | string)[]).map((val) =>
                            typeof val === 'string' ? val : Number(val)
                        )
                        onChange(selectedIds)
                    }}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}

export default FormMultiSelect