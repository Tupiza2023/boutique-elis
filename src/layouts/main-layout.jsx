import { Navbar } from '@/components/navbar';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import { withAuth } from './with-auth';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin-ext'],
});

const links = [
  { href: '/admin', label: 'Inicio' },
  { href: '/admin/inventario', label: 'Inventario' },
  { href: '/admin/ventas', label: 'Ventas' },
];

function MainLayout({ children, titulo }) {
  return (
    <>
      <Head>
        <title>{titulo}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={poppins.className}>
        <Navbar links={links} />
        <main className="flex justify-center items-center mx-auto max-w-screen-xl h-full px-4 xl:px-0">
          {children}
        </main>
      </div>
    </>
  );
}

export default withAuth(MainLayout);
