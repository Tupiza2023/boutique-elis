import MainLayout from '@/layouts/main-layout';
import { Dashboard } from '@/views/admin';

function AdminPage() {
  return (
    <MainLayout titulo={'Administración'}>
      <Dashboard />
    </MainLayout>
  );
}

export default AdminPage;
