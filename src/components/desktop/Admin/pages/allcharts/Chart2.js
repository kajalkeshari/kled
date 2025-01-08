import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", Temperature: 22, Humidity: 55, CO2: 400 },
  { name: "Feb", Temperature: 24, Humidity: 60, CO2: 420 },
  { name: "Mar", Temperature: 20, Humidity: 58, CO2: 410 },
  { name: "Apr", Temperature: 25, Humidity: 62, CO2: 430 },
  { name: "May", Temperature: 23, Humidity: 59, CO2: 415 },
];

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="Temperature"
          stackId="1"
          stroke="red"
          fill="rgba(255, 0, 0, 0.2)"
        />
        <Area
          type="monotone"
          dataKey="Humidity"
          stackId="1"
          stroke="blue"
          fill="rgba(0, 0, 255, 0.2)"
        />
        <Area
          type="monotone"
          dataKey="CO2"
          stackId="1"
          stroke="green"
          fill="rgba(0, 255, 0, 0.2)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
