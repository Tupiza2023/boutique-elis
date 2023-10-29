import { PaymentMethod } from '@/components/checkout';
import { MainClientLayout } from '@/layouts';
import { useCartStore } from '@/store/cart-store';
import { useRouter } from 'next/router';

import React from 'react';

export default function Checkout() {
  const router = useRouter();
  const { products } = useCartStore();
  const isEmpty = products.length === 0;
  if (isEmpty) {
    router.push('/');
  }

  return (
    <MainClientLayout titulo={'Pagar orden'}>
      <section className="w-full flex justify-center mt-2">
        <PaymentMethod />
      </section>
    </MainClientLayout>
  );
}
