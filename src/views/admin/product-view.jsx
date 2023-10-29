import { Button } from '@/components/ui/button';
import { useData } from '@/hooks';
import { formatCurrency, formatDate, formatTime } from '@/lib/formaters';
import { productsUrl } from '@/services/api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { deleteData } from '@/supabase/delete';
import { useToast } from '@/components/ui/use-toast';

export function ProductView() {
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, error } = useData({
    url: `${productsUrl}?handle=eq.${slug}&select=*`,
    shouldFetch: slug !== undefined,
  });
  const { toast } = useToast();
  const product = data?.[0];

  const handleDelete = async () => {
    const { error } = await deleteData({
      table: 'productos',
      id: product.id,
      url: `${productsUrl}?id=eq.${product.id}`,
    });
    if (error) {
      toast({
        title: 'Error',
        description:
          'Ha ocurrido un error al eliminar el producto, intenta de nuevo.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Producto eliminado',
        description: 'El producto ha sido eliminado correctamente.',
      });
      router.push('/admin/inventario');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className="space-y-4">
      <ProductViewToolbar product={product} />
      <div className="max-w-screen-xl flex flex-col md:flex-row md:space-x-10 ">
        <Image
          src={product?.featuredimageurl}
          alt={product?.name}
          width={400}
          height={400}
          className="rounded-md shadow-lg"
        />
        <div className="space-y-2">
          {product?.availableforsale ? (
            <p className="text-sm uppercase font-semibold text-green-500">
              Disponible
            </p>
          ) : (
            <p className="text-sm uppercase font-semibold text-red-500">
              No disponible
            </p>
          )}
          <h1 className="text-lg font-semibold capitalize">{product?.name}</h1>
          <Rating rating={4} />
          <p className="text-lg font-semibold">
            {formatCurrency(product?.price, product?.currencycode)}
          </p>
          <p className="text-sm text-gray-600">{product?.description}</p>
          <p className="font-semibold">
            Categoria: <span className="capitalize">{product?.tag}</span>
          </p>
          <p className="font-semibold">
            Cantidad: <span>{product?.quantity}</span>
          </p>
          <p className="font-semibold">Registrado en:</p>
          <div className="flex flex-col">
            <p>{formatDate(product?.createdat)}</p>
            <p className="text-sm text-gray-600">
              {formatTime(product?.createdat)}
            </p>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive">Eliminar</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  ¿Está seguro que quiere eliminar este Artículo?
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-row space-x-2">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Cancelar
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                  >
                    Eliminar
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

const Rating = ({ rating }) => {
  const totalStars = 5;
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStars }).map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${
            index < rating
              ? 'text-yellow-300'
              : 'text-gray-300 dark:text-gray-500'
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>
  );
};

const ProductViewToolbar = ({ product }) => {
  return (
    <div className="flex flex-row justify-end">
      <Link
        href={`/admin/inventario/${product?.handle}/editar`}
        passHref
        legacyBehavior
      >
        <Button variant="primary">Editar</Button>
      </Link>
    </div>
  );
};
