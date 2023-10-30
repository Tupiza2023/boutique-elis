import Grid from '@/components/grid';
import { ProductGridItems } from '@/components/search-client/product-grid-item';
import { Button } from '@/components/ui/button';
import { useSupaGetProducts } from '@/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BeatLoader } from 'react-spinners';

export function CollectionView() {
  const { data, isLoading, error, setRange, range } = useSupaGetProducts();

  const total = data?.total;
  const products = data?.products;
  const [min, max] = range;
  const step = 21;
  if (isLoading) {
    return <BeatLoader color="#36d7b7" />;
  }
  if (error) return <div>{error.message}</div>;

  const handleNext = () => {
    setRange([min + step, max + step]);
  };
  const handlePrev = () => {
    setRange([min - step, max - step]);
  };
  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No se encotró productos en esta categoría`}</p>
      ) : (
        <>
          {' '}
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products} />
          </Grid>
          <div className="fixed bottom-4 right-4  z-50 space-x-1">
            <Button size="icon" disabled={min <= 0} onClick={handlePrev}>
              <ChevronLeft />
            </Button>
            <Button size="icon" disabled={max >= total} onClick={handleNext}>
              <ChevronRight />
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
