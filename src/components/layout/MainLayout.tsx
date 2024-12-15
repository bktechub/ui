import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Toaster } from '@/components/ui/toaster';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}