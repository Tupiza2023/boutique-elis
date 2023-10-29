import MainLayout from '@/layouts/main-layout';
import { InventarioView } from '@/views/admin';

function Inventario() {
  return (
    <MainLayout titulo={'Inventario'}>
      <InventarioView />
    </MainLayout>
  );
}

export default Inventario;
