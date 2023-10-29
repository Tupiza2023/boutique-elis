import { Separator } from '@/components/ui/separator';
import { useData } from '@/hooks';
import { formatCurrency, formatDate, formatTime } from '@/lib/formaters';
import { ordersUrl } from '@/services/api';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function VentaView({ id }) {
  const { data, isLoading, error } = useData({
    url: `${ordersUrl}?id=eq.${id}&select=*`,
    shouldFetch: !!id,
  });
  const venta = data?.[0];
  console.log(venta);
  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="w-full">
      <p className="text-xl font-semibold">Orden #{venta.id}</p>
      <div className="flex flex-col items-center justify-center mt-2 space-y-2 ">
        <div className="border p-2 rounded md:p-4 space-y-2 max-w-screen-sm">
          <p className="text-lg font-bold">
            Cliente: <span className="font-normal">{venta.nombrecliente}</span>
          </p>
          <Separator />
          <p className="text-lg font-bold">
            Total:{' '}
            <span className="font-normal">
              {formatCurrency(venta.total, 'BOB')}
            </span>
          </p>
          <Separator />
          <div>
            <p className="text-lg font-bold">Fecha:</p>
            <div className="flex flex-col">
              <p className="font-normal">{formatDate(venta.createdat)}</p>
              <p className="font-normal text-xs text-gray-500">
                {formatTime(venta.createdat)}
              </p>
            </div>
          </div>
          <Separator />
          <p className="text-lg font-bold">
            Estado:{'  '}
            <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">
              {venta.estado}
            </span>
          </p>
        </div>

        <div className="max-w-screen-lg border p-2 rounded">
          <TableBasic products={venta.data.products} total={venta.total} />
        </div>
      </div>
    </div>
  );
}

function TableBasic({ products, total }) {
  return (
    <Table>
      <TableCaption>Detalle de compra</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Nombre</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead className="text-right">Sub total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map(invoice => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.name}</TableCell>
            <TableCell>{invoice.quantity} Item&apos;s</TableCell>
            <TableCell>
              {formatCurrency(invoice.price, invoice.currencycode)}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(
                invoice.price * invoice.quantity,
                invoice.currencycode
              )}
            </TableCell>
          </TableRow>
        ))}
        <div className="flex flex-row mt-4 justify-start space-x-2">
          <p className=" font-medium">Total:</p>
          <p>{formatCurrency(total, products[0].currencycode)}</p>
        </div>
      </TableBody>
    </Table>
  );
}
