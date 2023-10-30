import { MainClientLayout } from '@/layouts';
import SearchLayout from '@/layouts/search-layout';
import { CollectionView } from '@/views/users';
import React from 'react';

export default function Collection() {
  return (
    <MainClientLayout titulo="Catálogo" isClear>
      <SearchLayout>
        <CollectionView />
      </SearchLayout>
    </MainClientLayout>
  );
}
