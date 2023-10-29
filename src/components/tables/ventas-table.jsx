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
import { formatCurrency, formatDate, formatTime } from '@/lib/formaters';
import Image from 'next/image';
import Link from 'next/link';
import { BarLoader } from 'react-spinners';
import { MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebouce } from '@/hooks/use-debouce';
import { Button } from '../ui/button';
import { useVentas } from '@/hooks';
import { useQueryVentasStore } from '@/store/ventas-query-store';

export function VentasTable() {
  const { data: ventas, isLoading, error } = useVentas();
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="space-y-2 p-4 border rounded-sm">
      <div className="flex flex-col justify-start md:justify-between md:flex-row space-y-2 md:space-x-2">
        <InputSearchVentas />
        <TablePagination />
      </div>
      {isLoading && <BarLoader width={350} color="#36d7b7" />}
      {!isLoading && error !== null && (
        <Table className="max-w-screen-xl mx-auto overflow-x-auto border">
          <TableCaption>Registro de Ventas.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ventas?.map(venta => (
              <TableRow key={venta.id}>
                <TableCell className="min-w-[150px]">
                  <div>
                    <Link
                      href={`/admin/ventas/${venta.id}`}
                      passHref
                      legacyBehavior
                    >
                      <a className="font-semibold capitalize  hover:underline">
                        {venta.nombrecliente}
                      </a>
                    </Link>
                    <p className="text-gray-500 text-xs">{venta.genero}</p>
                  </div>
                </TableCell>
                <TableCell className="min-w-[120px]">
                  <div>
                    <p>{formatDate(venta.createdat)}</p>
                    <p className="text-gray-500 text-xs">
                      {formatTime(venta.createdat)}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <p>{formatCurrency(venta.total, 'BOB')}</p>
                </TableCell>
                <TableCell>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
                    {venta.estado}
                  </span>
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

const InputSearchVentas = () => {
  const { setSearch } = useQueryVentasStore();
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
  const { setQueryParams, queryParams } = useQueryVentasStore();
  const rowsPerPage = queryParams.maxLimit - queryParams.minLimit + 1;
  const { hasMore } = useVentas();
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
