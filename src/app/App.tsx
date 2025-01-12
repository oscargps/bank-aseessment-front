import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../query-client';
import { AppRouter } from './router';
import { StoreAppProvider } from './Context/Context';

export default function App() {
  return (
      <div className='MainApp h-full min-h-screen'>
        <QueryClientProvider client={queryClient}>
          <StoreAppProvider>
            <AppRouter />
          </StoreAppProvider>
        </QueryClientProvider>
      </div>
  );
}
