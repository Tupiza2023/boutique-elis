import { FilterList } from '@/components/search-client';
import { useData } from '@/hooks';
import { tagsUrl } from '@/services/api';

import { BeatLoader } from 'react-spinners';
const sorting = [
  {
    title: 'Reciente',
    slug: 'createdat-desc',
  },
  {
    title: 'Precio: Menor a Mayor',
    slug: 'price-asc',
  },
  {
    title: 'Precio: Mayor a Menor',
    slug: 'price-desc',
  },
];

export default function SearchLayout({ children }) {
  const { data, isLoading, error } = useData({
    url: `${tagsUrl}?select=name`,
  });

  if (isLoading) {
    return <BeatLoader color="#36d7b7" />;
  }

  if (error) return <div>{error.message}</div>;

  const categories = data.map(item => ({
    name: item.name,
    path: `/search/${item.name}`,
  }));

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
      <div className="order-first w-full flex-none md:max-w-[125px]">
        <FilterList
          list={[{ name: 'Todo', path: '/search' }, ...categories]}
          title="Categorias"
        />
      </div>
      <div className="order-last w-full md:order-none">{children}</div>
      <div className="order-none flex-none md:order-last md:w-[125px]">
        <FilterList list={sorting} title="Ordenar por" />
      </div>
    </div>
  );
}
