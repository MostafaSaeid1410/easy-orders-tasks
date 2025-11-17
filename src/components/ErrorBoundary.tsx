import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
    children: ReactNode;
    fallback?: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex min-h-screen items-center justify-center p-8">
                    <div className="max-w-md rounded-lg border border-red-300 bg-red-50 p-6 text-center">
                        <h2 className="mb-4 text-xl font-semibold text-red-900">
                            Something went wrong
                        </h2>
                        <p className="mb-4 text-red-700">
                            We're sorry, but something unexpected happened. Please
                            try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                        >
                            Refresh Page
                        </button>
                        {process.env.NODE_ENV === "development" &&
                            this.state.error && (
                                <details className="mt-4 text-left">
                                    <summary className="cursor-pointer text-sm font-medium text-red-800">
                                        Error Details (Development Only)
                                    </summary>
                                    <pre className="mt-2 overflow-auto rounded bg-red-100 p-2 text-xs text-red-900">
                                        {this.state.error.toString()}
                                        {this.state.error.stack}
                                    </pre>
                                </details>
                            )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

