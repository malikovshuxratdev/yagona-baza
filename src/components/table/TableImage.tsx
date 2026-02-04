import { Image } from 'antd'
import React from 'react'
import { FILE_URL } from '@/constants'
import { ExpandOutlined } from '@ant-design/icons';

interface TableImageProps {
    image: string
}

const TableImage: React.FC<TableImageProps> = ({ image }) => {
    return (
        <div className="flex items-center w-[50px] h-[70px] bg-white border border-ice-blue rounded-[2px]">
            <Image
                src={
                    image
                        ? `${FILE_URL}${image}`
                        : image
                }
                alt={'Image'}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '2px',
                }}
                preview={{
                    mask: (
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '4px',
                                right: '4px',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ExpandOutlined />
                        </div>
                    ),
                    styles: {
                        mask: {
                            cursor: 'pointer',
                            boxShadow: 'none',
                            background: 'transparent',
                        },
                    },
                    maskClosable: true,
                }}
                fallback="/placeholder-image.png"
            />
        </div>
    )
}

export default TableImage