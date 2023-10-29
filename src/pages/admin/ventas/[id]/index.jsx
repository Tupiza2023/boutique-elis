import MainLayout from '@/layouts/main-layout';
import { VentaView } from '@/views/admin';

import { useRouter } from 'next/router';

export default function Venta() {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) return null;
  return (
    <MainLayout titulo={`Orden-${id}`}>
      <VentaView id={id} />
    </MainLayout>
  );
}
