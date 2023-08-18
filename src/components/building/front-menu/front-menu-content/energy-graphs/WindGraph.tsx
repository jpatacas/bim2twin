// WindGraph.tsx
import React from 'react';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';

interface WindGraphProps {
  windGeneration: number[];
}

const WindGraph: React.FC<WindGraphProps> = ({ windGeneration }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const traceWind: Data = {
    x: months,
    y: windGeneration,
    type: 'bar',
    name: 'Wind Power Generation',
  };

  const data: Data[] = [traceWind];

  const layout: Partial<Layout> = {
    barmode: 'stack',
    title: 'Wind Power Generation by Month<br><span style=\'font-size:0.8em;color:gray\'>kWh</span>',
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

export default WindGraph;
