import LoginForm from '@/components/forms/login-form';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      <Head>
        <title>Iniciar Sesión</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center  h-full space-y-8 mt-12">
        <h3 className="font-semibold text-2xl">
          Iniciar Sesión como Administrador
        </h3>
        <LoginForm />
      </main>
    </>
  );
}
