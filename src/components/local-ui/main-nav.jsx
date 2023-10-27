import Link from 'next/link';
import { useRouter } from 'next/router';

import { cn } from '@/lib/utils';

export function MainNav({ className, links = [], ...props }) {
  const router = useRouter();

  return (
    <div
      className={cn('hidden gap-6 text-sm md:flex md:items-center', className)}
      {...props}
    >
      {links.map((link, index) => {
        const isActive = router.pathname === link.href;
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
