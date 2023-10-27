import { LineChart, Line, ResponsiveContainer } from 'recharts';

export function TinyLineChart({
  data,
  stroke = '#ADFA1D',
  height = 50,
  width = 150,
}) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart width={300} height={100} data={data}>
        <Line type="monotone" dataKey="pv" stroke={stroke} strokeWidth={1} />
      </LineChart>
    </ResponsiveContainer>
  );
}
