import { Navbar } from '@/components/navbar';
import { Poppins } from 'next/font/google';
import Head from 'next/head';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin-ext'],
});
const links = [
  { href: '/', label: 'Inicio' },
  { href: '/store/', label: 'Catálogo' },
  { href: '/store/historial', label: 'Historial' },
];
export function MainClientLayout({ children, titulo }) {
  return (
    <>
      <Head>
        <title>{titulo}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={poppins.className}>
        <Navbar links={links} isClient={true} />
        <main className="flex justify-center items-center mx-auto max-w-screen-lg h-full px-4 lg:px-0">
          {children}
        </main>
      </div>
    </>
  );
}
