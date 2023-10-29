import { useData } from '@/hooks';
import MainLayout from '@/layouts/main-layout';
import { productsUrl } from '@/services/api';
import { ProductView } from '@/views/admin';
import { useRouter } from 'next/router';

export default function Product() {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useData({
    url: `${productsUrl}?handle=eq.${slug}&select=*`,
    shouldFetch: !!slug,
  });
  const product = data?.[0];
  if (!router.isReady) return null;
  return (
    <MainLayout titulo={product?.name ?? slug}>
      <ProductView slug={slug} />
    </MainLayout>
  );
}
