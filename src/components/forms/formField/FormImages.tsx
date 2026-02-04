import React, { useState, useEffect } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ImageUpload from '@/components/shared/ImageUpload';

interface FormImagesProps {
    label: string;
    required?: boolean;
    value?: string[];
    onChange?: (value: string[]) => void;
    className?: string;
    maxSize?: number;
    accept?: string;
}

const FormImages: React.FC<FormImagesProps> = ({
    label,
    required,
    value = [],
    onChange,
    className,
    maxSize = 5,
    accept = '.jpg,.jpeg,.png,.gif,.webp,.svg',
}) => {
    const [images, setImages] = useState<string[]>(value || []);

    useEffect(() => {
        setImages(value || []);
    }, [value]);

    const handleImageChange = (index: number, imageUrl: string) => {
        if (imageUrl && imageUrl.trim() !== '') {
            const newImages = [...images];
            if (index >= newImages.length) {
                newImages.push(imageUrl);
            } else {
                newImages[index] = imageUrl;
            }
            setImages(newImages);
            onChange?.(newImages);
        } else {
            const newImages = images.filter((_, i) => i !== index);
            setImages(newImages);
            onChange?.(newImages);
        }
    };

    return (
        <FormItem className={className || 'w-full'}>
            <FormLabel className="text-lg font-medium text-black block mb-2">
                {label}
                {required && <span className="text-red">*</span>}
            </FormLabel>
            <FormControl>
                <div className="space-y-4">
                    {(images.length > 0 ? images : ['']).map((image, index) => (
                        <div key={index} className="relative">
                            <ImageUpload
                                file={image}
                                onChange={(imageUrl) => handleImageChange(index, imageUrl)}
                                maxSize={maxSize}
                                accept={accept}
                            />
                        </div>
                    ))}
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};

export default FormImages;
