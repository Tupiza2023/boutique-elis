import { useData } from '@/hooks';
import { MainClientLayout } from '@/layouts';
import { productsUrl } from '@/services/api';
import { ProductView } from '@/views/users';
import { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners';

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, error } = useData({
    url: `${productsUrl}?handle=eq.${slug}`,
    shouldFetch: router.isReady,
  });
  if (!router.isReady) return null;
  if (isLoading)
    return (
      <div>
        <BeatLoader color="#36d7b7" />
      </div>
    );
  if (error) return <div>{error.message}</div>;
  return (
    <MainClientLayout titulo={data[0].name}>
      <ProductView product={data[0]} />
    </MainClientLayout>
  );
}
