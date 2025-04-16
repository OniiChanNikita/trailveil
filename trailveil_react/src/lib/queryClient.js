import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 минут
      cacheTime: 1000 * 60 * 30, // 30 минут
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    }
  }
});

export default queryClient;