import { FC } from "react";
import Plot from "react-plotly.js";

export const EnergyMenu: FC = () => {
  return (
    <>
      <div>
        <p>Test</p>
      </div>

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
        layout={{ width: 320, height: 240, title: "Test Plot" }}
      />
    </>
  );
};
