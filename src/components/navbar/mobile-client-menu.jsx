import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Search } from '../search';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function MobileMenu({ links, isClient = false }) {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="absolute h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <div className="flex flex-col h-full mt-4">
          {isClient && <Search />}
          {links.map((link, index) => {
            const isActive = router.pathname === link.href;
            return (
              <Link key={index} href={link.href} legacyBehavior passHref>
                <a
                  className={cn(
                    'block px-4 py-2 text-sm font-medium  transition-colors hover:text-primary',
                    isActive ? '' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </a>
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
