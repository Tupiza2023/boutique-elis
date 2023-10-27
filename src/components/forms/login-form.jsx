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
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginSchema } from '@/validations';
import { DotLoader } from 'react-spinners';
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/router';
import { singIn } from '@/supabase/auth';
import { supabase } from '@/supabase/client';
const schema = loginSchema;

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async data => {
    setLoading(true);
    const { email, password } = data;
    const { data: result, error } = await singIn({ email, password });
    if (error) {
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Error al iniciar sesión',
        description: 'Verifica tus credenciales',
      });
    }
    if (result.user && !error) {
      setLoading(false);
      router.push('/admin');
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[400px] space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormDescription>Ingresa tu email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="Contraseña" type="password" {...field} />
              </FormControl>
              <FormDescription>Ingresa tu contraseña</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!loading ? (
          <Button type="submit">Enviar</Button>
        ) : (
          <DotLoader color="#36d7b7" />
        )}
      </form>
    </Form>
  );
}
