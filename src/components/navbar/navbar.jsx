import React from 'react';
import { MobileMenu } from './mobile-client-menu';
import { LogoSquare, MainNav, ModeToggle } from '../local-ui';
import { Search } from '../search';
import { Cart } from '../cart';
import { Button } from '../ui/button';
import { singOut } from '@/supabase/auth';
import { useRouter } from 'next/router';

export function Navbar({ links, isClient = false }) {
  const router = useRouter();
  const handleLogout = () => {
    singOut();
    router.push('/admin/login');
  };
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu links={links} isClient={isClient} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <div className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              Boutique Elis
            </div>
          </div>
          <MainNav links={links} />
        </div>
        {isClient && (
          <div className="hidden justify-center md:flex md:w-1/3">
            <Search />
          </div>
        )}
        {isClient && (
          <div className="flex justify-end md:w-1/3 space-x-2">
            <Cart />
            <ModeToggle />
          </div>
        )}
      </div>
      {!isClient && (
        <div className="flex justify-end md:w-1/3 space-x-2">
          <ModeToggle />
          <Button onClick={handleLogout}>Cerrar Sesion</Button>
        </div>
      )}
    </nav>
  );
}
