import { ProductDescription } from '@/components/product-description';

import Image from 'next/image';

export function ProductView({ product }) {
  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <Image
            src={product.featuredimageurl}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>

        <div className="basis-full lg:basis-2/6">
          <ProductDescription product={product} />
        </div>
      </div>
      {/* <Suspense>
    <RelatedProducts tag={product.tag} />
  </Suspense> */}
    </div>
  );
}
