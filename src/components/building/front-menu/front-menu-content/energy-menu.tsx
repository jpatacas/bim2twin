import { FC, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import StackedBarGraph from "./energy-graphs/stacked-bar-graph";
import SolarGraph from "./energy-graphs/solar-graph";
import WindGraph from "./energy-graphs/wind-graph";
import MonthlyCostsBarChart from "./energy-graphs/monthly-costs-bar-chart";
import { useAppContext } from "../../../../middleware/context-provider";
import { databaseHandler } from "../../../../core/db/db-handler";
import { EnergyData } from "../../../../types";

// 1.energy consumption plot needs all data sources (elec grid, gas, wind, solar) and stack them (e.g bar chart stack)
// 2. solar and wind generation graphs
// 3. overall costs stacked (elec grid + gas)

// Mock data for energy use by month (replace with actual data)
const gasData = [120, 150, 130, 140, 90, 80, 70, 90, 120, 140, 160, 150];
const electricityData = [
  200, 250, 230, 220, 240, 260, 250, 270, 280, 260, 240, 230,
];
const solarData = [50, 60, 70, 70, 80, 90, 100, 90, 80, 70, 60, 50];
const windData = [80, 80, 90, 60, 70, 70, 90, 80, 100, 80, 90, 80];

export const EnergyMenu: FC = () => {
  const [state, dispatch] = useAppContext();
  const [energyData, setEnergyData] = useState<EnergyData[]>([]) 

  useEffect(() => {
    //console.log("useEffect running");

    const buildingId = "clb1tGh504gYrYgPhf0g";

    // Fetch energy data from the database for the specified building
    dispatch({ type: "GET_ENERGY_DATA", payload: buildingId });
    

    // Array of month names
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Create mock energy data entries for each month
    const mockEnergyData = months.map((month, index) => ({
      buildingId,
      month,
      electricity: electricityData[index],
      gas: gasData[index],
      solar: solarData[index],
      wind: windData[index],
    }));

    // Dispatch the ADD_ENERGY_DATA action for each entry
    // mockEnergyData.forEach((entry) => {
    //   dispatch({ type: "ADD_ENERGY_DATA", payload: entry });
    // });
  }, []);

  useEffect(() => {
    // Fetch energy data for a specific building from the database
    const fetchEnergyData = async () => {
      const buildingId = "clb1tGh504gYrYgPhf0g"; // Replace with your building ID
      const energyData = await databaseHandler.getEnergyData(buildingId);
      setEnergyData(energyData); // Set fetched energy data in state
    };

    fetchEnergyData();
  }, []);
  console.log(energyData)

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
        />
      </div>
    </div>
  );
};
