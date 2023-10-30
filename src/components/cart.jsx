import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCartStore } from '@/store/cart-store';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { formatCurrency } from '@/lib/formaters';
import { useRouter } from 'next/router';
const forUSDtoBs = 6.96;
export function Cart() {
  const router = useRouter();
  const { products, setTotal } = useCartStore();
  const isEmpty = products.length === 0;

  const total = products.reduce((acc, product) => {
    const { price, quantity, currencycode } = product;
    if (currencycode === 'USD') {
      return acc + price * quantity * forUSDtoBs;
    }

    return acc + product.price * product.quantity;
  }, 0);

  const handleCheckout = () => {
    setTotal(total);
    router.push('/checkout');
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart className="absolute h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className={'mb-4'}>
          <SheetTitle>Mi carrito de compras</SheetTitle>
        </SheetHeader>
        {isEmpty && <EmptyCart />}
        {!isEmpty && <ListOfProducts />}
        {!isEmpty && (
          <div className="flex flex-row justify-between">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-semibold">
              {formatCurrency(total, 'BOB')}
            </p>
          </div>
        )}
        <SheetFooter className="mt-4">
          <SheetClose asChild>
            {!isEmpty && <Button onClick={handleCheckout}>Comprar</Button>}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const EmptyCart = () => <div>Carrito vacio</div>;

const ListOfProducts = () => {
  const { products } = useCartStore();
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <ProductItem product={product} />
        </div>
      ))}
    </div>
  );
};

const ProductItem = ({ product }) => {
  const { setProducts, decreaseQuantity, deleteProduct } = useCartStore();
  if (!product) return null;
  const handleDelete = id => {
    deleteProduct(id);
  };
  const handleDecrease = id => {
    decreaseQuantity(id);
  };
  const handleIncrease = product => {
    const { id, name, price, currencycode, featuredimageurl } = product;
    setProducts({
      id,
      name,
      price,
      currencycode,
      featuredimageurl,
      quantity: 1,
    });
  };
  return (
    <>
      <div className="flex flex-row justify-between mb-2 mt-2">
        <div className="relative p-1 rounded-lg border">
          <Image
            src={product.featuredimageurl}
            width={50}
            height={50}
            alt={product.name}
          />
          <Button
            size="icon"
            variant="outline"
            className="absolute top-[0] right-0 z-10 p-1 text-xs h-6 w-6"
            onClick={() => handleDelete(product.id)}
          >
            x
          </Button>
        </div>

        <p className="text-lg capitalize font-semibold">{product.name}</p>
        <div>
          <p className="flex flex-col space-y-1 text-lg font-semibold">
            {formatCurrency(product.price, product.currencycode)}
          </p>
          <div className="flex flex-row items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDecrease(product.id)}
            >
              -
            </Button>
            <p className="mx-2">{product.quantity}</p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleIncrease(product)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};
