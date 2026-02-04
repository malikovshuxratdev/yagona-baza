import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    className?: string;
    showDetails?: boolean;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ComponentErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Component Error Boundary caught an error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className={`p-6 rounded-xl border border-red-100 bg-red-50/30 flex flex-col items-center justify-center text-center space-y-4 ${this.props.className}`}>
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="h-6 w-6 text-red-500" />
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900">Komponent xatoligi</h3>
                        <p className="text-sm text-gray-600 max-w-[300px]">
                            Ushbu qismni yuklashda xatolik yuz berdi.
                        </p>
                    </div>

                    {this.props.showDetails && this.state.error && (
                        <div className="w-full max-h-32 overflow-auto rounded-lg bg-white/50 p-3 text-left border border-red-100">
                            <code className="text-xs text-red-600 font-mono italic">
                                {this.state.error.message}
                            </code>
                        </div>
                    )}

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={this.handleReset}
                        className="gap-2 border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        <RefreshCcw className="h-4 w-4" />
                        Qayta urinish
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ComponentErrorBoundary;
