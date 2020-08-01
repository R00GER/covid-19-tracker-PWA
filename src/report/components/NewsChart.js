import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Brush,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "../page/Report.css";

const NewsChart = ({ chartData }) => {
  
  return (
      <ResponsiveContainer width="99%" style={{display: "flex", justifyContent: "center"}}>
        <LineChart
          // data from Report component
          data={chartData}
          margin={{
            top: 80,
            right: 5,
            left: -35,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* MAIN LINES */}
          <Line
            type="monotone"
            dataKey="news"
            name="News"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            name="Infections"
            dataKey="confirmed"
            stroke="#ffae42"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            name="Deaths"
            dataKey="deaths"
            stroke="#ff0000"
            strokeWidth={2}
          />

          {/* COMPONENT TO 'BRUSH' AXIS */}
          <Brush
            dataKey="name"
            height={30}
            stroke="#8884d8"
            startIndex={0}
            endIndex={3}
          >
            <LineChart>
              <Line
                type="monotone"
                dataKey="news"
                stroke="#8884d8"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#ffae42"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="deaths"
                stroke="#ff0000"
                dot={false}
              />
            </LineChart>
          </Brush>
        </LineChart>
      </ResponsiveContainer>
  );
};

export default NewsChart;
