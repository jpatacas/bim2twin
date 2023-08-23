import { FC, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import StackedBarGraph from "./energy-graphs/stacked-bar-graph";
import SolarGraph from "./energy-graphs/solar-graph";
import WindGraph from "./energy-graphs/wind-graph";
import MonthlyCostsBarChart from "./energy-graphs/monthly-costs-bar-chart";
import { useAppContext } from "../../../../middleware/context-provider";
import { databaseHandler } from "../../../../core/db/db-handler";
import { EnergyData } from "../../../../types";

export const EnergyMenu: FC = () => {
  const [state] = useAppContext();
  const [energyData, setEnergyData] = useState<EnergyData[]>([]) 

  useEffect(() => {
    // Fetch energy data for a specific building from the database
    const fetchEnergyData = async () => {
      if (state.building) {

        const buildingId = state.building.uid; // "clb1tGh504gYrYgPhf0g"; // Replace with your building ID
        const energyData = await databaseHandler.getEnergyData(buildingId);
        setEnergyData(energyData); // Set fetched energy data in state
      }
    };

    fetchEnergyData();
  }, []);
  console.log(energyData)
  console.log(state)

  return (
    <div className="plot-container">
      <div className="first-plot">
        
        <Plot
          data={[
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: state.building?.energy, //the actual value (input)
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
      {energyData.length !== 0 && (<>
        <StackedBarGraph
        gasData={energyData.map(data => data.gas)}
        electricityData={energyData.map(data => data.electricity)}
        solarData={energyData.map(data => data.solar)}
        windData={energyData.map(data => data.wind)}
        />

        <SolarGraph solarGeneration={energyData.map(data => data.solar)}/>

        <WindGraph windGeneration={energyData.map(data => data.wind)} />

        <MonthlyCostsBarChart
        gasData={energyData.map(data => data.gas)}
        electricityData={energyData.map(data => data.electricity)}
        solarData={energyData.map(data => data.solar)}
        windData={energyData.map(data => data.wind)}
        /></>)}
      </div>
    </div>
  );
};
