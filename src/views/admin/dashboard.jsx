import { BarChar, TinyLineChart, TwoLineChart } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateRandomData } from '@/lib/utils';

const dataTwoLineChart = [
  {
    name: 'Enero',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Febrero',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Marzo',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Abril',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Mayo',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Junio',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Julio',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Agosto',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Septiembre',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Octubre',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dataBarChar = [
  {
    name: 'Ventas',
    uv: 3530,
    pv: 3236,
    amt: 2400,
  },
];

export function Dashboard() {
  const data1 = generateRandomData();
  const data2 = generateRandomData();
  const data3 = generateRandomData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 mt-3 w-full">
      <div className="md:col-start-1 md:row-start-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-left">
              Productos Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row space-x-3">
              <div>
                <p className="text-xl font-bold ">230</p>
                <p className="text-sm text-green-500">+3.5%</p>
              </div>
              <TinyLineChart data={data1} stroke="#ADFA1D" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-start-2 md:row-start-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-left">Banlance Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row space-x-3">
              <div>
                <p className="text-xl font-bold ">12,040</p>
                <p className="text-sm text-green-500">+2.2%</p>
              </div>
              <TinyLineChart data={data2} stroke="#02F9E4" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-start-3 md:row-start-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-left">
              Beneficios de Ventas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row space-x-3">
              <div>
                <p className="text-xl font-bold ">4,876</p>
                <p className="text-sm text-green-500">+1.6%</p>
              </div>
              <TinyLineChart data={data3} stroke="#F9D102" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-start-1 md:row-start-2 md:row-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Ventas por Genero</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChar
              data={dataBarChar}
              height={300}
              name1={'Hombres'}
              name2={'Mujeres'}
              stroke1={'#ADFA1D'}
              stroke2={'#02F9E4'}
            />
          </CardContent>
        </Card>
      </div>

      <div className="md:col-start-2 md:col-span-2 md:row-start-2 md:row-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Anuales</CardTitle>
          </CardHeader>
          <CardContent>
            <TwoLineChart
              data={dataTwoLineChart}
              name1={'Ingresos Totales'}
              name2={'Gastos Totales'}
              stroke1={'#ADFA1D'}
              stroke2={'#02F9E4'}
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
