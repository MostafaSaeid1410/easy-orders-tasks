import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/styles/global.css";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import QueryProvider from "./providers/QueryProvider/QueryProvider.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <StrictMode>
        <ErrorBoundary>
            <QueryProvider>
                <App />
            </QueryProvider>
        </ErrorBoundary>
    </StrictMode>,
);
