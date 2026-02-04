import { router } from './routes';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, App as AntApp } from 'antd';
import { RouterProvider } from 'react-router';
import { Suspense } from 'react';
import { ThemeProvider } from 'next-themes';
import { PageLoading } from '@/components';
import { AuthProvider } from '@/contexts/AuthContext';
import uzUZ from 'antd/locale/uz_UZ';
import moment from 'moment';
import 'moment/locale/uz-latn';

moment.locale('uz-latn');

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <AuthProvider>
            <ConfigProvider
                locale={uzUZ}
                theme={{
                    token: {
                        fontFamily: 'Montserrat, sans-serif',
                    },
                }}
            >
                <AntApp>
                    <QueryClientProvider client={queryClient}>
                        <Suspense fallback={<PageLoading />}>
                            <RouterProvider router={router} />
                        </Suspense>
                    </QueryClientProvider>
                </AntApp>
            </ConfigProvider>
            <Toaster richColors />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
