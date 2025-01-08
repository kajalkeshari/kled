import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', Temperature: 22, Humidity: 55, CO2: 400 },
  { name: 'Feb', Temperature: 24, Humidity: 60, CO2: 420 },
  { name: 'Mar', Temperature: 20, Humidity: 58, CO2: 410 },
  { name: 'Apr', Temperature: 25, Humidity: 62, CO2: 430 },
  { name: 'May', Temperature: 23, Humidity: 59, CO2: 415 },
];

const ChartComponent = () => (
  <LineChart width={600} height={300} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="Temperature" stroke="red" />
    <Line type="monotone" dataKey="Humidity" stroke="blue" />
    <Line type="monotone" dataKey="CO2" stroke="green" />
  </LineChart>
);

export default ChartComponent;
