import React from 'react';
import Plot from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';

interface MonthlyCostsBarChartProps {
  electricityData: number[];
  gasData: number[];
  solarData: number[];
  windData: number[];
}

const MonthlyCostsBarChart: React.FC<MonthlyCostsBarChartProps> = ({
  electricityData,
  gasData,
  solarData,
  windData,
}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const conversionRate = 0.40;

  // Calculate electricity and gas costs
  const electricityCosts = electricityData.map(usage => usage * conversionRate);
  const gasCosts = gasData.map(usage => usage * conversionRate);

  // Calculate solar and wind offsets
  const solarOffset = solarData.map(production => production * conversionRate);
  const windOffset = windData.map(production => production * conversionRate);

  // Calculate net costs for electricity and gas after offsets
  const netElectricityCosts = electricityCosts.map((cost, index) => Math.max(cost - solarOffset[index] - windOffset[index], 0));
  const netGasCosts = gasCosts.map((cost, index) => Math.max(cost - solarOffset[index] - windOffset[index], 0));
  // Calculate total monthly costs by summing net electricity and net gas costs
  const netMonthlyCosts = netElectricityCosts.map((cost, index) => cost + netGasCosts[index]);

  // Create data trace for total monthly costs
  const traceTotalCosts: Data = {
    x: months,
    y: netMonthlyCosts,
    type: 'bar',
    name: 'Total Monthly Costs',
  };

  const data: Data[] = [traceTotalCosts];

  const layout: Partial<Layout> = {
    title: 'Monthly Energy Costs in GBP',
    xaxis: {
      title: 'Month',
    },
    yaxis: {
      title: 'Cost in GBP',
    },
  };

  return (
    <Plot
      data={data}
      layout={layout}
    />
  );
};

export default MonthlyCostsBarChart;
