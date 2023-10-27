import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CustomTooltip } from '.';

export function BarChar({ data, height, stroke1, stroke2, name1, name2 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        width={500}
        height={300}
        data={data}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="pv"
          name={name1}
          fill={stroke1}
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="uv"
          name={name2}
          fill={stroke2}
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
