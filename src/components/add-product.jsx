import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from './ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { SyncLoader } from 'react-spinners';
import { addProductSchema } from '@/validations/add-product';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useData } from '@/hooks';
import { bucketUrl, tagsUrl } from '@/services/api';
import { uploadFiles } from '@/supabase/upload-files';
import { Label } from './ui/label';
import { supabase } from '@/supabase/client';
import { useProducts } from '@/hooks/use-products';

export function AddProduct() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Registrar producto</SheetTitle>
        </SheetHeader>
        <ProductForm />
        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button variant="secondary">Cerrar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const currencyCodes = [
  {
    label: 'Bolivianos (Bs)',
    value: 'BOB',
  },
  {
    label: 'Dolares (USD)',
    value: 'USD',
  },
];

const ProductForm = () => {
  const { data: categories } = useData({ url: `${tagsUrl}?select=*` });
  const { mutate } = useProducts();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      currencyCode: 'BOB',
      tag: '',
      handle: '',
      image: '',
      quantity: '',
    },
  });
  const { toast } = useToast();
  const onSubmit = async data => {
    setLoading(true);
    const bucketName = 'images';
    const { error } = await supabase.from('productos').insert({
      name: data.name,
      description: data.description,
      price: Number(data.price),
      featuredimageurl: `${bucketUrl}/${bucketName}/${data.handle}`,
      currencycode: data.currencyCode,
      tag: data.tag,
      handle: data.handle,
      availableforsale: true,
      quantity: Number(data.quantity),
      createdat: new Date().toISOString(),
    });

    if (error) {
      toast({
        title: 'Error',
        description:
          error.message ?? 'Ocurrio un error al registrar el producto.',
        variant: 'destructive',
      });
      setLoading(false);
    } else {
      const { error } = await uploadFiles({
        bucketName,
        file: data.image[0],
        path: data.handle,
      });
      if (error) {
        console.log(error);
        toast({
          title: 'Error',
          description:
            error.message ?? 'Ocurrio un error al registrar el producto.',
          variant: 'destructive',
        });
        setLoading(false);
      } else {
        toast({
          title: 'Producto registrado',
          description: 'El producto se registro correctamente.',
        });
        form.reset();
        setLoading(false);
        mutate();
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del producto..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Descripción..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-between">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input placeholder="Precio.." type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currencyCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Moneda</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {currencyCodes.map(currencyCode => (
                      <SelectItem
                        value={currencyCode.value}
                        key={currencyCode.value}
                      >
                        {currencyCode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-between">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input placeholder="Cantidad..." type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map(cat => (
                      <SelectItem value={cat.name} key={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Slug..." {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                El slug es la url amigable del producto
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Label htmlFor="image">Imagen</Label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            {...form.register('image')}
          />
        </div>

        <div className="flex justify-start">
          {!loading ? (
            <Button type="submit">Registrar</Button>
          ) : (
            <SyncLoader color="#36d7b7" />
          )}
        </div>
      </form>
    </Form>
  );
};
