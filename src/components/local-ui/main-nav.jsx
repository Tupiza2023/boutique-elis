import Link from 'next/link';

import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

export function MainNav({ className, links = [], ...props }) {
  const pathname = usePathname();

  return (
    <div
      className={cn('hidden gap-6 text-sm md:flex md:items-center', className)}
      {...props}
    >
      {links.map((link, index) => {
        const isActive = pathname === link.href.split('?')[0];
        return (
          <Link key={index} href={link.href} legacyBehavior passHref>
            <a
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive ? '' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
