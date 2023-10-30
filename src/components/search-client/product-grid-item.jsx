import Link from 'next/link';
import Grid from '../grid';
import { GridTileImage } from '../grid/tile';

export function ProductGridItems({ products }) {
  return (
    <>
      {products.map(product => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.handle}`}
          >
            <GridTileImage
              alt={product.name}
              label={{
                title: product.name,
                amount: product.price,
                currencyCode: product.currencycode,
              }}
              src={product.featuredimageurl}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
