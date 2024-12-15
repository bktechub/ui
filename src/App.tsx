import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegistrationPage } from '@/features/registration/RegistrationPage';
import { ROUTES } from '@/lib/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginForm />} />
          <Route path={ROUTES.REGISTER} element={<RegistrationPage />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;