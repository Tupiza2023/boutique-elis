import { Navbar } from '@/components/navbar';
import { Poppins } from 'next/font/google';
import Head from 'next/head';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin-ext'],
});
const links = [
  { href: '/', label: 'Inicio' },
  { href: '/search?sort=createdat-desc', label: 'Catálogo' },
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
        <main>{children}</main>
      </div>
    </>
  );
}
