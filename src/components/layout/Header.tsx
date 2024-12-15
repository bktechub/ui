import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { logout } from '@/features/auth/authSlice';
import { ROUTES } from '@/lib/routes';
import { Globe2 } from 'lucide-react';

export function Header() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center space-x-2">
          <Globe2 className="h-6 w-6" />
          <span className="font-bold">e-IMIRYANGO</span>
        </Link>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
              <Button
                variant="ghost"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button>Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}