// import { AddToCart } from 'components/cart/add-to-cart';
import { useCartStore } from '@/store/cart-store';
import { Price } from './price';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

export function ProductDescription({ product }) {
  const { setProducts } = useCartStore();
  const { toast } = useToast();
  const addToCart = product => {
    const { id, name, price, currencycode, featuredimageurl } = product;
    setProducts({
      id,
      name,
      price,
      currencycode,
      featuredimageurl,
      quantity: 1,
    });
    toast({
      title: 'Producto agregado',
      description: 'El producto fue agregado al carrito de compras',
      isClosable: true,
    });
  };
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium capitalize">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={product.price} currencyCode={product.currencycode} />
        </div>
      </div>
      <p className="mx-auto max-w-6xl text-base leading-7 text-gray-600">
        {product.description}
      </p>
      <p>
        Disponible: <span>{product.quantity}</span>
      </p>
      <Button
        className="mt-6 w-full text-lg font-semibold"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </Button>
    </>
  );
}
