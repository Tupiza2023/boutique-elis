import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PuffLoader } from 'react-spinners';
import { supabase } from '@/supabase/client';

export function withAuth(Component) {
  return function ProtectedRoute(props) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.push('/admin/login'); // Redirige al usuario a la página de login si no está autenticado.
        } else {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      <div className="h-screen">
        <div className="flex items-center justify-center h-full">
          <PuffLoader color="#36d7b7" />
        </div>
      </div>;
    }
    return <Component {...props} />;
  };
}
