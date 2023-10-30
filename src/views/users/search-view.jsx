import Grid from '@/components/grid';
import { ProductGridItems } from '@/components/search-client/product-grid-item';
import { Button } from '@/components/ui/button';
import { useSupaGetProducts } from '@/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { BeatLoader } from 'react-spinners';

export function SearchView() {
  const { data, isLoading, error, setRange, range } = useSupaGetProducts();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('q');
  const total = data?.total;
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
    <>
      {searchValue ? (
        <p className="mb-4">
          {data.products.length === 0
            ? 'Sin resultados para '
            : `Mostrando ${data.products.length} ${
                total > 1 ? 'resultados' : 'resultado'
              } para `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {data.products.length > 0 ? (
        <>
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={data.products} />
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
      ) : null}
    </>
  );
}
