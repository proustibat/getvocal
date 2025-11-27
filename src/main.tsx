import './styles/index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import {FlowProvider} from "./context/FlowContext.tsx";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';




const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <FlowProvider>
        <App />
      </FlowProvider>
    </QueryClientProvider>
  </StrictMode>,
);
