import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProducts } from '@/hooks/use-products';
import { formatCurrency, formatDate, formatTime } from '@/lib/formaters';
import Image from 'next/image';
import Link from 'next/link';
import { BarLoader } from 'react-spinners';
import { MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouce } from '@/hooks/use-debouce';
import { useQueryProductsStore } from '@/store/products-query-store';
import { Button } from '../ui/button';

export default function ProductsTable() {
  const { data: products, isLoading, error } = useProducts();
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="space-y-2 p-4 border rounded-sm">
      <div className="flex flex-col justify-start md:justify-between md:flex-row space-y-2 md:space-x-2">
        <InputSearchProducts />
        <TablePagination />
      </div>
      {isLoading && <BarLoader width={350} color="#36d7b7" />}
      {!isLoading && error !== null && (
        <Table className="max-w-screen-xl mx-auto overflow-x-auto border">
          <TableCaption>Inventario de Productos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Creado en</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>En venta</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical size={18} color="gray" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Link
                          href={`/admin/inventario/${product.handle}`}
                          passHref
                          legacyBehavior
                        >
                          <a>Ver</a>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link
                          href={`/admin/inventario/${product.handle}/editar`}
                          passHref
                          legacyBehavior
                        >
                          <a>Editar</a>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="min-w-[150px]">
                  <div className="flex flex-row space-x-4 ">
                    <Image
                      src={product.featuredimageurl}
                      width={50}
                      height={60}
                      alt={product.handle}
                      className="rounded w-[50px] h-[60px] sm:w-auto sm:h-auto"
                    />
                    <div>
                      <Link
                        href={`/admin/inventario/${product.handle}`}
                        passHref
                        legacyBehavior
                      >
                        <a className="font-semibold capitalize  hover:underline">
                          {product.name}
                        </a>
                      </Link>
                      <p className="text-gray-500 text-xs">{product.tag}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="min-w-[120px]">
                  <div>
                    <p>{formatDate(product.createdat)}</p>
                    <p className="text-gray-500 text-xs">
                      {formatTime(product.createdat)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <p>{product.quantity} en stock</p>
                </TableCell>
                <TableCell>
                  <p>{formatCurrency(product.price, product.currencycode)}</p>
                </TableCell>
                <TableCell>
                  <p
                    className={
                      product.availableforsale
                        ? 'text-green-400'
                        : 'text-red-400'
                    }
                  >
                    {product.availableforsale ? 'Disponible' : 'No disponible'}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <TablePagination />
    </div>
  );
}

const InputSearchProducts = () => {
  const { setSearch } = useQueryProductsStore();
  const [query, setQuery] = useState('');
  const debouceQuery = useDebouce(query, 700);
  useEffect(() => {
    setSearch(debouceQuery);
  }, [debouceQuery, setSearch]);
  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        className="block w-full sm:text-sm transition duration-150 ease-in-out"
        placeholder="Buscar por nombre"
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
    </div>
  );
};

const TablePagination = () => {
  const { setQueryParams, queryParams } = useQueryProductsStore();
  const rowsPerPage = queryParams.maxLimit - queryParams.minLimit + 1;
  const { hasMore } = useProducts();
  const { minLimit, maxLimit } = queryParams;
  const handleNext = () => {
    if (!hasMore) return;
    setQueryParams({
      minLimit: minLimit + rowsPerPage,
      maxLimit: maxLimit + rowsPerPage,
    });
  };
  const handlePrev = () => {
    setQueryParams({
      minLimit: minLimit - rowsPerPage,
      maxLimit: maxLimit - rowsPerPage,
    });
  };
  return (
    <div>
      <div className="space-x-2">
        <Button
          size="sm"
          variant="outline"
          disabled={minLimit === 0}
          onClick={handlePrev}
        >
          Anterior
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={!hasMore}
          onClick={handleNext}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};
