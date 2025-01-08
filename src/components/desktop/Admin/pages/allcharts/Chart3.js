/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Text } from 'recharts';

const RADIAN = Math.PI / 180;

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key="needle-circle" />,
    <path
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="none"
      fill={color}
      key="needle-path"
    />,
  ];
};

const getLevel = (value, data) => {
  let accumulatedValue = 0;
  for (const section of data) {
    accumulatedValue += section.value;
    if (value <= accumulatedValue) {
      return section.name;
    }
  }
  return "Unknown";
};

const CustomChart = ({ title, data, cx, cy, iR, oR, value, needleColor }) => {
  const level = getLevel(value, data);

  return (
    <div style={{ margin: '1rem' }}>
      <h3 style={{ textAlign: 'center' }}>{title}</h3>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, needleColor)}
        <Text
          x={cx}
          y={cy + oR + 20}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="16"
          fontWeight="bold"
        >
          {`Level: ${level}`}
        </Text>
      </PieChart>
    </div>
  );
};

export default class Example extends PureComponent {
  render() {
    const temperatureData = [
      { name: 'Low', value: 30, color: '#00bfff' },
      { name: 'Moderate', value: 40, color: '#ffbf00' },
      { name: 'High', value: 30, color: '#ff4500' },
    ];
    const co2Data = [
      { name: 'Low', value: 50, color: '#00ff7f' },
      { name: 'Moderate', value: 30, color: '#ffbf00' },
      { name: 'High', value: 20, color: '#ff4500' },
    ];
    const humidityData = [
      { name: 'Low', value: 20, color: '#add8e6' },
      { name: 'Moderate', value: 50, color: '#4682b4' },
      { name: 'High', value: 30, color: '#00008b' },
    ];

    const cx = 150;
    const cy = 150;
    const iR = 50;
    const oR = 100;

    return (
      <div
        style={{
          display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center',
          // flexWrap: 'wrap',
          margin: '2rem',
        }}
      >
        <CustomChart
          title="Temperature"
          data={temperatureData}
          cx={cx}
          cy={cy}
          iR={iR}
          oR={oR}
          value={50}
          needleColor="#d0d000"
        />
        <CustomChart
          title="CO2 Levels"
          data={co2Data}
          cx={cx}
          cy={cy}
          iR={iR}
          oR={oR}
          value={60}
          needleColor="#ff4500"
        />
        <CustomChart
          title="Humidity"
          data={humidityData}
          cx={cx}
          cy={cy}
          iR={iR}
          oR={oR}
          value={40}
          needleColor="#4682b4"
        />
      </div>
    );
  }
}
