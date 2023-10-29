import MainLayout from '@/layouts/main-layout';
import { ProductView } from '@/views/admin';
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <MainLayout titulo={slug}>
      <ProductView />
    </MainLayout>
  );
}
