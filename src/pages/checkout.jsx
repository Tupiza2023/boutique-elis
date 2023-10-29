import { PaymentMethod } from '@/components/checkout';
import { MainClientLayout } from '@/layouts';

export default function Checkout() {
  return (
    <MainClientLayout titulo={'Pagar orden'}>
      <section className="w-full flex justify-center mt-2">
        {/* <PaymentMethod /> */}
      </section>
    </MainClientLayout>
  );
}
