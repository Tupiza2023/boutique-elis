import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { addCategorySchema } from '@/validations';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/supabase/client';
import { useToast } from './ui/use-toast';
import { SyncLoader } from 'react-spinners';
import { mutate } from 'swr';
import { tagsUrl } from '@/services/api';
const categorySchema = addCategorySchema;
export function AddCategory() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Categoria
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Agregar Categoria</DialogTitle>
          <DialogDescription>
            Agrega una nueva categoria para los productos.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm />
      </DialogContent>
    </Dialog>
  );
}

const CategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const onSubmit = async data => {
    setLoading(true);
    const { error } = await supabase.from('tags').insert({
      name: data.name,
      description: data.description,
    });
    if (error) {
      toast({
        title: 'Error',
        description: 'Ocurrio un error al registrar la categoria.',
        variant: 'destructive',
      });
      setLoading(false);
    } else {
      toast({
        title: 'Categoria registrada',
        description: 'La categoria se registro correctamente.',
      });
      form.reset();
      setLoading(false);
      mutate(`${tagsUrl}?select=*`);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese la categoria..." {...field} />
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
        <div className="flex justify-end">
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
