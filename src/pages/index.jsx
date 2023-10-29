import { MainClientLayout } from '@/layouts';
import { HomeView } from '@/views/users';
export default function Home() {
  return (
    <MainClientLayout titulo="Boutique Elis">
      <HomeView />
    </MainClientLayout>
  );
}
