import React from 'react';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';

interface StackedBarGraphProps {
  gasData: number[];
  electricityData: number[];
  solarData: number[];
  windData: number[];
}

const StackedBarGraph: React.FC<StackedBarGraphProps> = ({
  gasData,
  electricityData,
  solarData,
  windData,
}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const traceGas: Data = {
    x: months,
    y: gasData,
    type: 'bar',
    name: 'Gas',
  };

  const traceElectricity: Data = {
    x: months,
    y: electricityData,
    type: 'bar',
    name: 'Electricity',
  };

  const traceSolar: Data = {
    x: months,
    y: solarData,
    type: 'bar',
    name: 'Solar',
  };

  const traceWind: Data = {
    x: months,
    y: windData,
    type: 'bar',
    name: 'Wind',
  };

  const data: Data[] = [traceGas, traceElectricity, traceSolar, traceWind];

  const layout: Partial<Layout> = {
    barmode: 'stack',
    title: 'Energy Use by Month<br><span style=\'font-size:0.8em;color:gray\'>kWh</span>',
    xaxis: {
      title: 'Month',
    },
    yaxis: {
      title: 'Energy Consumption<br><span style=\'font-size:0.8em;color:gray\'>kWh</span>',
    },
  };

  return (
    <Plot
      data={data}
      layout={layout}
    />
  );
};

export default StackedBarGraph;
