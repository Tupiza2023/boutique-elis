import { useData } from '@/hooks';
import { tagsUrl } from '@/services/api';
import { SyncLoader } from 'react-spinners';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { DataTable } from './data-table';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { deleteData } from '@/supabase/delete';
const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nombre
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('description')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(category.name)}
            >
              Copiar nombre
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={async () => {
                await deleteData({
                  url: `${tagsUrl}?select=*`,
                  table: 'tags',
                  id: category.id,
                });
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <p>Eliminar</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
export function CategoriaTable() {
  const {
    data: tags,
    isLoading,
    error,
  } = useData({ url: `${tagsUrl}?select=*` });
  if (isLoading) return <SyncLoader color="#36d7b7" />;
  if (error) return <div>Error al optener los datos</div>;
  return (
    <DataTable
      data={tags}
      columns={columns}
      filterBy={'name'}
      placeholder={'Buscar por nombre'}
      isColumnFilterable={false}
    />
  );
}
