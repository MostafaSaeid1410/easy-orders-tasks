import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            retry: 3,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        },
    },
});

export default queryClient;
