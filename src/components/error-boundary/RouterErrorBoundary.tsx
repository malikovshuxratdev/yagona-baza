import { useNavigate, useRouteError, isRouteErrorResponse } from 'react-router';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RefreshCcw, ArrowLeft } from 'lucide-react';

const RouterErrorBoundary = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    // Default error state
    let errorTitle = "Kutilmagan xatolik";
    let errorDescription = "Kechirasiz, tizimda kutilmagan xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.";
    let status: number | undefined = undefined;

    // Check for specific router errors
    if (isRouteErrorResponse(error)) {
        status = error.status;
        if (error.status === 404) {
            errorTitle = "Sahifa topilmadi";
            errorDescription = "Siz qidirayotgan sahifa mavjud emas, o'chirilgan yoki manzili o'zgartirilgan bo'lishi mumkin.";
        } else if (error.status === 401) {
            errorTitle = "Ruxsat yo'q";
            errorDescription = "Ushbu sahifaga kirish uchun sizda yetarli huquqlar mavjud emas.";
        } else if (error.status === 500) {
            errorTitle = "Server xatoligi";
            errorDescription = "Serverda ichki xatolik yuz berdi. Biz bu haqda xabardormiz va tez orada tuzatamiz.";
        } else if (error.status === 503) {
            errorTitle = "Xizmat ko'rsatilmayapti";
            errorDescription = "Server vaqtincha texnik xizmat ko'rsatish rejimida. Iltimos, birozdan keyin urinib ko'ring.";
        }
    } else if (error instanceof Error) {
        console.error("Router Error:", error);
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            <div className="relative flex w-full max-w-2xl flex-col items-center space-y-10 rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-2xl shadow-gray-200/50">

                {/* Icon with glowing effect */}
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-red-100 blur-2xl opacity-60 animate-pulse"></div>
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/50">
                        <AlertCircle className="h-12 w-12 text-red-500" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{errorTitle}</h1>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto sm:text-xl">
                        {errorDescription}
                    </p>
                    {status && (
                        <div className="pt-2">
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-600/10">
                                Status Code: {status}
                            </span>
                        </div>
                    )}
                </div>

                {/* Detailed error message for debugging */}
                {(error as any)?.message || (error as any)?.statusText || (error as any)?.data ? (
                    <div className="w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50 text-left">
                        <div className="border-b border-gray-100 bg-gray-100/50 px-6 py-3">
                            <p className="text-sm font-semibold text-gray-700">Texnik xatolik:</p>
                        </div>
                        <div className="p-6">
                            <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-all font-mono text-sm text-red-600/90 leading-relaxed">
                                {(error as any)?.message || (error as any)?.statusText || JSON.stringify((error as any)?.data || error)}
                            </pre>
                        </div>
                    </div>
                ) : null}

                <div className="flex w-full flex-col gap-4 sm:flex-row sm:px-8">
                    <Button
                        size="lg"
                        onClick={() => window.location.reload()}
                        className="h-12 w-full gap-2 text-base shadow-sm sm:flex-1"
                    >
                        <RefreshCcw size={20} />
                        Qayta yuklash
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate('/dashboard')}
                        className="h-12 w-full gap-2 text-base sm:flex-1"
                    >
                        <Home size={20} />
                        Bosh sahifa
                    </Button>
                </div>

                <Button
                    variant="link"
                    size="lg"
                    onClick={() => navigate(-1)}
                    className="gap-2 text-gray-500 hover:text-gray-900 text-base"
                >
                    <ArrowLeft size={18} />
                    Ortga qaytish
                </Button>
            </div>
        </div>
    );
};

export default RouterErrorBoundary;
