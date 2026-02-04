import React from 'react';
import { Loader2 } from 'lucide-react';

const PageLoading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-[500px] w-full">
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                    <Loader2 className="w-[60xp] h-[60px] sm:w-[80px] sm:h-[80px] text-blue animate-spin" />
                </div>
                <p className="text-lg text-gray-light-6">
                    Loading...
                </p>
            </div>
        </div>
    );
};

export default PageLoading;
