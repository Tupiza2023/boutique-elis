import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function TwoLineChart({
  data,
  stroke1,
  stroke2,
  name1,
  name2,
  height = 250,
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          name={name1} // Nombre personalizado para 'pv'
          stroke={stroke1}
          activeDot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="uv"
          name={name2} // Nombre personalizado para 'uv'
          stroke={stroke2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow-md">
        <p className="label">{`${label}`}</p>
        <p className="intro">{`${payload[0].name} : ${payload[0].value}`}</p>
        <p className="desc">{`${payload[1].name} : ${payload[1].value}`}</p>
      </div>
    );
  }

  return null;
}
