import React, { useMemo, useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './QuillEditor.css';

if (typeof window !== 'undefined') {
    const originalWarn = console.warn;
    const originalError = console.error;

    const filterFindDOMNode = (args: any[]) => {
        const message = args[0];
        if (typeof message === 'string') {
            return message.includes('findDOMNode is deprecated');
        }
        if (args.length > 0 && typeof args[0] === 'object') {
            const str = JSON.stringify(args);
            return str.includes('findDOMNode');
        }
        return false;
    };

    console.warn = (...args: any[]) => {
        if (filterFindDOMNode(args)) {
            return;
        }
        originalWarn.apply(console, args);
    };

    console.error = (...args: any[]) => {
        if (filterFindDOMNode(args)) {
            return;
        }
        originalError.apply(console, args);
    };
}

interface QuillEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    readOnly?: boolean;
    maxWords?: number;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
    value = '',
    onChange,
    placeholder,
    readOnly = false,
    maxWords = 1000,
}) => {
    const quillRef = useRef<ReactQuill>(null);
    const [wordCount, setWordCount] = useState(0);

    const calculateWordCount = (html: string) => {
        if (!html) return 0;
        const text = html.replace(/<[^>]*>/g, '');
        const words = text
            .trim()
            .split(/\s+/)
            .filter((word) => word.length > 0);
        return words.length;
    };

    useEffect(() => {
        setWordCount(calculateWordCount(value));
    }, [value]);

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                [{ size: [] }],
                [
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'blockquote',
                    'code-block',
                ],
                [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                ],
                [{ script: 'sub' }, { script: 'super' }],
                [{ align: [] }],
                [{ direction: 'rtl' }],
                [{ color: [] }, { background: [] }],
                ['link', 'image', 'video'],
                ['code-block'],
                ['clean'],
            ],
        }),
        []
    );

    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'code-block',
        'list',
        'bullet',
        'indent',
        'script',
        'align',
        'direction',
        'color',
        'background',
        'link',
        'image',
        'video',
    ];

    const handleChange = (content: string) => {
        const newWordCount = calculateWordCount(content);
        
        if (newWordCount > maxWords) {
            if (quillRef.current) {
                const quill = quillRef.current.getEditor();
                const currentValue = value || '';
                quill.setContents(quill.clipboard.convert({ html: currentValue }));
            }
            return;
        }
        
        if (onChange) {
            onChange(content);
        }
        setWordCount(newWordCount);
    };

    return (
        <div className="quill-editor-wrapper">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                readOnly={readOnly}
                className="quill-editor"
            />
            <div className="quill-editor-footer">
                <span className="quill-word-count">
                    So'zlar soni:
                    <strong className={`ml-2 ${wordCount > maxWords ? 'text-red' : wordCount > maxWords * 0.9 ? 'text-orange' : 'text-blue'}`}>
                        {wordCount}
                    </strong>
                    <span className="text-gray-500 ml-1">/ {maxWords}</span>
                </span>
            </div>
        </div>
    );
};

export default QuillEditor;
