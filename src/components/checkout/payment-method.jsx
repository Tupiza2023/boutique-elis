import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import { Label } from '../ui/label';
import { Icons } from './icons';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { RadioGroupItem, RadioGroup } from '../ui/radio-group';
import { useRouter } from 'next/router';

export function PaymentMethod() {
  const router = useRouter();
  const { products } = useCartStore();
  const isEmpty = products.length === 0;
  if (isEmpty) {
    router.push('/');
  }

  return (
    <Card className="max-w-screen-md">
      <CardHeader>
        <CardTitle>Pagar</CardTitle>
        <CardDescription>
          Su información de pago está segura. No almacenamos los detalles de su
          cuenta
        </CardDescription>
      </CardHeader>
      <form action="">
        <CardContent className="grid gap-6">
          <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem value="card" id="card" className="peer sr-only" />
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="mb-3 h-6 w-6"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
                Card
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="paypal"
                id="paypal"
                className="peer sr-only"
                disabled
              />
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Icons.paypal className="mb-3 h-6 w-6" />
                Paypal
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="apple"
                id="apple"
                className="peer sr-only"
                disabled
              />
              <Label
                htmlFor="apple"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Icons.apple className="mb-3 h-6 w-6" />
                Apple
              </Label>
            </div>
          </RadioGroup>
          <div className="grid gap-2">
            <Label htmlFor="nombrecliente">Nombre</Label>
            <Input
              id="nombrecliente"
              name="nombrecliente"
              placeholder="Nombre completo"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="direccioncliente">Dirección</Label>
            <Input
              id="direccioncliente"
              name="direccioncliente"
              placeholder="Dirección de envío"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="genro">Género</Label>
            <Input id="genero" name="genero" placeholder="Género (opcional)" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="number">Número de targeta</Label>
            <Input id="number" placeholder="" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="month">Expira en</Label>
              <Select>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="year">Year</Label>
              <Select>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem
                      key={i}
                      value={`${new Date().getFullYear() + i}`}
                    >
                      {new Date().getFullYear() + i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="CVC" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Pagar</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
