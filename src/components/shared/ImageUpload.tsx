import React, { useState, useRef, useEffect } from 'react';
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { App } from 'antd';

interface ImageUploadProps {
    file?: string;
    onChange?: (fileUrl: string) => void;
    maxSize?: number;
    accept?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    file,
    onChange,
    maxSize = 5,
    accept = '.jpg,.jpeg,.png,.gif,.webp,.svg',
}) => {
    const { message } = App.useApp();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(file || null);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
    const localPreviewUrlRef = useRef<string | null>(null);

    const prevFileRef = useRef<string | undefined>(file);
    useEffect(() => {
        if (prevFileRef.current !== file) {
            prevFileRef.current = file;

            if (file && !file.startsWith('blob:')) {
                setImageUrl(file);
            } else if (file === '') {
                if (localPreviewUrlRef.current) {
                    URL.revokeObjectURL(localPreviewUrlRef.current);
                    setLocalPreviewUrl(null);
                    localPreviewUrlRef.current = null;
                }
                setImageUrl(null);
            }
        }
    }, [file]);

    useEffect(() => {
        return () => {
            if (localPreviewUrl) {
                URL.revokeObjectURL(localPreviewUrl);
            }
        };
    }, [localPreviewUrl]);

    const isImageFile = (fileName: string): boolean => {
        const imageExtensions = [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'webp',
            'svg',
            'bmp',
            'ico',
        ];
        const ext = fileName.split('.').pop()?.toLowerCase() || '';
        return imageExtensions.includes(ext);
    };

    const validateFile = (selectedFile: File): string | null => {
        if (!isImageFile(selectedFile.name)) {
            return `Rasm yuklash uchun qo'llanilgan formatlar: ${accept}.`;
        }

        const fileSizeInMB = selectedFile.size / (1024 * 1024);
        if (fileSizeInMB > maxSize) {
            return `Rasm yuklash uchun max ${maxSize}MB o'lchamda bo'lishi kerak.`;
        }

        if (accept && accept !== '*') {
            const fileExtension =
                '.' + selectedFile.name.split('.').pop()?.toLowerCase();
            const acceptedTypes = accept
                .split(',')
                .map((type) => type.trim().toLowerCase());

            if (!acceptedTypes.includes(fileExtension)) {
                return `Rasm yuklash uchun qo'llanilgan formatlar: ${accept}.`;
            }
        }

        return null;
    };

    const handleFileSelect = (selectedFile: File) => {
        const validationError = validateFile(selectedFile);

        if (validationError) {
            message.error(validationError);
            return;
        }

        console.log('📁 File selected:', selectedFile.name, selectedFile.size);

        if (localPreviewUrl) {
            URL.revokeObjectURL(localPreviewUrl);
        }
        if (localPreviewUrlRef.current) {
            URL.revokeObjectURL(localPreviewUrlRef.current);
        }

        const newPreviewUrl = URL.createObjectURL(selectedFile);
        console.log('🆕 New preview URL created:', newPreviewUrl);

        setLocalPreviewUrl(newPreviewUrl);
        localPreviewUrlRef.current = newPreviewUrl;

    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (localPreviewUrl) {
            URL.revokeObjectURL(localPreviewUrl);
            setLocalPreviewUrl(null);
            localPreviewUrlRef.current = null;
        }
        setImageUrl(null);
        onChange?.('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const imageSrc = localPreviewUrl
        ? localPreviewUrl
        : imageUrl
            ? imageUrl.startsWith('http')
                ? imageUrl
                : imageUrl
            : null;

    const displayImage = !!imageSrc;

    useEffect(() => {
        console.log('📊 ImageUpload State:', {
            file,
            imageUrl,
            localPreviewUrl,
            imageSrc,
            displayImage,
        });
    }, [file, imageUrl, localPreviewUrl]);

    return (
        <div className="w-full">
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileInputChange}
                className="hidden"
            />

            {!displayImage ? (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        fileInputRef.current?.click();
                    }}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                        }`}
                >
                    <CloudUploadOutlined className="text-5xl text-blue-light mb-4" />
                    <p className="text-base mb-1 font-medium text-gray-700">
                        Rasm yuklash{' '}
                        <span className="text-blue-light font-semibold">
                            Tanlash
                        </span>
                    </p>
                    <p className="text-sm text-gray-500">
                        Rasm yuklash uchun max {maxSize}MB o'lchamda bo'lishi kerak.
                    </p>
                </div>
            ) : (
                <div
                    className="relative inline-block w-full group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                        <img
                            src={imageSrc}
                            alt="Uploaded"
                            className="max-w-full max-h-[500px] w-auto h-auto object-contain block"
                            style={{ display: 'block' }}
                        />
                        {isHovering && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-all shadow-lg"
                                    title="Rasm o'chirish"
                                >
                                    <DeleteOutlined className="text-xl" />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="mt-2 text-center">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                fileInputRef.current?.click();
                            }}
                            className="text-sm text-blue-600 hover:text-blue-700 underline"
                        >
                            Rasm o'zgartirish
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
