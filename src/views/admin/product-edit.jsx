import { currencyCodes } from '@/components/add-product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useData } from '@/hooks';
import { productsUrl, tagsUrl } from '@/services/api';
import { supabase } from '@/supabase/client';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';

export function ProductEdit({ slug }) {
  const { data, isLoading, error } = useData({
    url: `${productsUrl}?handle=eq.${slug}&select=*`,
    shouldFetch: slug !== undefined && slug !== null,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  const product = data?.[0];
  return (
    <div className="">
      <EditForm product={product} />
    </div>
  );
}

const EditForm = ({ product }) => {
  const {
    id,
    featuredimageurl,
    createdat,
    descriptionhtml,
    options,
    alttext,
    handle,
    ...rest
  } = product;
  const [values, setValues] = useState({ ...rest });
  const [isLoading, setIsLoading] = useState(false);
  const { data: categories } = useData({ url: `${tagsUrl}?select=*` });
  const { toast } = useToast();
  const onChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase
      .from('productos')
      .update(values)
      .eq('id', id);
    if (error) {
      toast({
        title: 'Error',
        description: 'Ha ocurrido un error al actualizar el producto.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Actualizado',
        description: 'El producto ha sido actualizado correctamente.',
        variant: 'success',
      });
    }
    setIsLoading(false);
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit} className="space-y-2">
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <div className="md:w-[350px]">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={values.name}
                onChange={onChange}
              />
            </div>
            <div className="md:w-[350px]">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                name="description"
                type="text"
                defaultValue={values.description}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <div className="md:w-[350px]">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                name="price"
                type="number"
                defaultValue={values.price}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col space-y-2 md:w-[350px] ">
              <Label htmlFor="currencycode">Moneda</Label>
              <select
                id="currencycode"
                name="currencycode"
                onChange={onChange}
                defaultValue={values.currencycode}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {currencyCodes.map(code => (
                  <option key={code.value} value={code.value}>
                    {code.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <div className="md:w-[350px]">
              <Label htmlFor="quantity">Cantidad</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                defaultValue={values.quantity}
                onChange={onChange}
              />
            </div>
            <div className="md:w-[350px]">
              <Label htmlFor="tag">Categoria</Label>
              <select
                id="tag"
                name="tag"
                onChange={onChange}
                defaultValue={values.tag}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {categories?.map(code => (
                  <option key={code.id} value={code.name}>
                    {code.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {isLoading ? (
            <BeatLoader color="#36d7b7" />
          ) : (
            <Button type="submit">Guardar</Button>
          )}
        </form>
      </div>
    </>
  );
};
