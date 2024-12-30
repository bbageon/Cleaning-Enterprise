import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Context
import { CustomProvider } from './context/CustomContext';

// Styles
import './index.css';
import './styles/colors.css';
import './styles/font.css';

// React-Query
const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <Router>
        <CustomProvider>
          <App />
        </CustomProvider>
      </Router>
    </QueryClientProvider>
  );
} else {
  console.error('index.tsx: Root Element not found.');
}

reportWebVitals();
