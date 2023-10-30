import { MainClientLayout } from '@/layouts';
import SearchLayout from '@/layouts/search-layout';
import { SearchView } from '@/views/users';
export default function SearchPage() {
  return (
    <MainClientLayout titulo="Catálogo" isClear>
      <SearchLayout>
        <SearchView />
      </SearchLayout>
    </MainClientLayout>
  );
}
