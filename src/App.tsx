import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {FlowDetailsPage} from "./pages/FlowDetailsPage.tsx";
import {FlowsPage} from "./pages/FlowsPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: '/', element: <FlowsPage /> },
  { path: '/flow/:id', element: <FlowDetailsPage /> },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
