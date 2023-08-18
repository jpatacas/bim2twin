import { FC } from "react";
import Plot from "react-plotly.js";
import StackedBarGraph from "./energy-graphs/StackedBarGraph";
import SolarGraph from "./energy-graphs/SolarGraph";
import WindGraph from "./energy-graphs/WindGraph";
import MonthlyCostsBarChart from "./energy-graphs/MonthlyCostsBarChart";

// 1.energy consumption plot needs all data sources (elec grid, gas, wind, solar) and stack them (e.g bar chart stack)
// 2. solar and wind generation graphs
// 3. overall costs stacked (elec grid + gas)

  // Mock data for energy use by month (replace with actual data)
  const gasData = [120, 150, 130, 140, 90, 80, 70, 90, 120, 140, 160, 150];
  const electricityData = [200, 250, 230, 220, 240, 260, 250, 270, 280, 260, 240, 230];
  const solarData = [50, 60, 70, 70, 80, 90, 100, 90, 80, 70, 60, 50];
  const windData = [80, 80, 90, 60, 70, 70, 90, 80, 100, 80, 90, 80];

  const solarGeneration = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
  const windGeneration = [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140];


export const EnergyMenu: FC = () => {
  return (
    <div className="plot-container">
      <div className="first-plot">
        <Plot
          data={[
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: 190, //the actual value (input)
              title: {
                text: "Benchmark comparison<br><span style='font-size:0.8em;color:gray'>kWh/m2/yr</span>",
              },
              type: "indicator",
              mode: "gauge+number+delta",
              delta: { reference: 200 }, //the initial value
              gauge: { axis: { range: [140, 390] } },
            },
          ]}
          layout={{
            width: 500,
            height: 240,
            margin: { t: 80, b: 25, l: 25, r: 25 },
          }}
        />
      </div>
      <div className="scrollable-plots">
        
      <StackedBarGraph
        gasData={gasData}
        electricityData={electricityData}
        solarData={solarData}
        windData={windData}
      />

      <SolarGraph
        solarGeneration={solarData}
      />

      <WindGraph
        windGeneration={windData}
      />

      <MonthlyCostsBarChart 
                gasData={gasData}
                electricityData={electricityData}
                solarData={solarData}
                windData={windData}

      />
    
      </div>
    </div>
  );
};
