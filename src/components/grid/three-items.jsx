import Link from 'next/link';
import { GridTileImage } from '@/components/grid/tile';
import { useProducts } from '@/hooks/use-products';
import { BeatLoader } from 'react-spinners';

function ThreeItemGridItem({ item, size, priority }) {
  return (
    <div
      className={
        size === 'full'
          ? 'md:col-span-4 md:row-span-2'
          : 'md:col-span-2 md:row-span-1'
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
      >
        <GridTileImage
          src={item.featuredimageurl}
          fill
          sizes={
            size === 'full'
              ? '(min-width: 768px) 66vw, 100vw'
              : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name,
            amount: item.price,
            currencyCode: item.currencycode,
          }}
        />
      </Link>
    </div>
  );
}
export function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const { data, error, isLoading } = useProducts();
  if (isLoading)
    return (
      <div>
        <BeatLoader color="#36d7b7" />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  const homepageItems = data;

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
