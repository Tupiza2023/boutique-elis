import { createUrl } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onSubmit = e => {
    e.preventDefault();
    //recuperamos el valor del input
    const val = e.target;
    const search = val.search;
    const newParams = new URLSearchParams(searchParams.toString());
    //validamos si existe un valor en el input
    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }
    //actualizamos la url
    router.push(createUrl('/search', newParams));
  };
  return (
    <form
      onSubmit={onSubmit}
      className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        key={searchParams?.get('q')}
        type="text"
        name="search"
        placeholder="Buscar productos..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <SearchIcon className="h-4" />
      </div>
    </form>
  );
}
