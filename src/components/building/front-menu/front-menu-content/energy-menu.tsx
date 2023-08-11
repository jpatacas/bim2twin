import { FC } from "react";
import Plot from "react-plotly.js";

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
      <Plot
        data={[
          {
            x: [1, 2, 3, 4],
            y: [10, 15, 13, 17],
            type: "scatter",
          },
          {
            x: [1, 2, 3, 4],
            y: [16, 5, 11, 9],
            type: "scatter",
          },
        ]}
        layout={{ width: 500, height: 240, title: "Energy Consumption<br><span style='font-size:0.8em;color:gray'>kWh</span>" ,margin: { t: 80, b: 25, l: 25, r: 0 }}}
      />

      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 500, height: 240, title: "Cost<br><span style='font-size:0.8em;color:gray'>£</span>" , margin: { t: 80, b: 25, l: 25, r: 0 }}}
      />
      </div>
    </div>
  );
};
