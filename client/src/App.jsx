import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import { LoadingSpinner } from './components/common/LoadingSpinner';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Suspense
            fallback={
              <LoadingSpinner
                fullPage
                size="large"
                message="Loading..."
              />
            }
          >
            <AppRoutes />
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;