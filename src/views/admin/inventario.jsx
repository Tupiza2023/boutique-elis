import { AddCategory } from '@/components/add-categoria';
import { AddProduct } from '@/components/add-product';
import { CategoriaTable } from '@/components/tables';
import ProductsTable from '@/components/tables/products-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function InventarioView() {
  return (
    <Tabs defaultValue="inventory" className="w-full">
      <TabsList>
        <TabsTrigger value="inventory">Inventario</TabsTrigger>
        <TabsTrigger value="category">Categorias</TabsTrigger>
      </TabsList>
      <TabsContent value="inventory">
        <section className="flex flex-col w-full  space-y-2 md:space-y-5">
          <div className="flex justify-end space-x-4">
            <AddProduct />
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
