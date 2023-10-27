import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingCart className="absolute h-[1.2rem] w-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Mi carrito de compras</SheetTitle>
        </SheetHeader>
        <p>aqui va el carrito de compras</p>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Comprar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
//TODO: hacer la logica del carrito
