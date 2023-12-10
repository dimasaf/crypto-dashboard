import React, { useState } from "react";
import numeral from "numeral";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { deepPurple } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { colors } from "@mui/material";
import { DUMMY_DATA } from "../../constant/data.js";

Chart.register(...registerables);

const DoughnutChart = () => {
  const theme = useTheme();

  const [chartData] = useState(DUMMY_DATA);

  const data = {
    // copy data from the state to a new array,
    // sort it by current_price in ascending order,
    // filter out 0, NaN and values below $100,
    // take top 5 results using slice
    // and then map
    labels: chartData
      .sort((a, b) => a.current_price - b.current_price)
      .filter((coin) => coin.current_price > 100)
      .slice(0, 5)
      .map((coin) => coin.name),
    datasets: [
      {
        data: chartData
          .sort((a, b) => (a.current_price > b.current_price ? 1 : -1))
          .filter((coin) => coin.current_price > 100)
          .slice(0, 5)
          .map((coin) => coin.current_price),
        backgroundColor: [
          theme.palette.customYellow.dark,
          theme.palette.error.dark,
          theme.palette.primary.main,
          theme.palette.success.dark,
          deepPurple[600],
        ],
        borderWidth: 1,
        borderColor: colors.common.white,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
    },
    cutout: "50%",
    plugins: {
      legend: {
        display: true,
        padding: 30,
        labels: {
          color: theme.palette.text.primary,
          font: {
            size: 14,
          },
        },
      },
      datalabels: {
        display: true,
        color: colors.common.white,
        align: "center",
        labels: {
          title: {
            font: {
              weight: "bold",
              size: 13,
            },
          },
        },
        formatter: (value) => numeral(value).format("$0,0.00"),
      },
    },
  };

  return (
    <Card>
      <CardHeader
        title="Top 5 Cheapest Cryptocurrencies"
        subheader="Top 5 Cheapest Cryptocurrencies Above $100 Measured By Their Market Price"
      />
      <Divider />
      <CardContent>
        <Box sx={{ height: 400, position: "relative" }}>
          <Pie data={data} options={options} plugins={[ChartDataLabels]} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
