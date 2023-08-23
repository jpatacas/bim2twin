// SolarGraph.tsx
import React from 'react';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';

interface SolarGraphProps {
  solarGeneration: number[];
}

const SolarGraph: React.FC<SolarGraphProps> = ({ solarGeneration }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const traceSolar: Data = {
    x: months,
    y: solarGeneration,
    type: 'bar',
    name: 'Solar Power Generation',
  };

  const data: Data[] = [traceSolar];

  const layout: Partial<Layout> = {
    barmode: 'stack',
    title: 'Solar Power Generation by Month<br><span style=\'font-size:0.8em;color:gray\'>kWh</span>',
    xaxis: {
      title: 'Month',
    },
    yaxis: {
      title: 'Energy Generation<br><span style=\'font-size:0.8em;color:gray\'>kWh</span>',
    },
  };

  return (
    <Plot
      data={data}
      layout={layout}
    />
  );
};

export default SolarGraph;
