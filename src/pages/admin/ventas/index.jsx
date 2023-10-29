import MainLayout from '@/layouts/main-layout';
import { VentasView } from '@/views/admin';

const Ventas = () => {
  return (
    <MainLayout titulo={'Ventas'}>
      <VentasView />
    </MainLayout>
  );
};

export default Ventas;
