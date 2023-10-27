import { AddCategory } from '@/components/add-categoria';
import { CategoriaTable } from '@/components/tables';
import ProductsTable from '@/components/tables/products-table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';

export function InventarioView() {
  return (
    <Tabs defaultValue="inventory" className="w-full">
      <TabsList>
        <TabsTrigger value="inventory">Inventario</TabsTrigger>
        <TabsTrigger value="category">Categorias</TabsTrigger>
      </TabsList>
      <TabsContent value="inventory">
        <section className="flex flex-col w-full mt-3 space-y-2 md:space-y-16">
          <div className="flex justify-end space-x-4">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>
          <ProductsTable />
        </section>
      </TabsContent>
      <TabsContent value="category" className="space-y-4">
        <div className="flex justify-end space-x-4">
          <AddCategory />
        </div>
        <CategoriaTable />
      </TabsContent>
    </Tabs>
  );
}
