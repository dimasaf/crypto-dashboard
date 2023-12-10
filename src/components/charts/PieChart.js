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
import { useTheme } from "@mui/material/styles";
import { colors } from "@mui/material";
import { DUMMY_DATA } from "../../constant/data.js";

Chart.register(...registerables);

const CryptoByVolumePieChart = () => {
  const theme = useTheme();

  const [chartData] = useState(DUMMY_DATA);

  const data = {
    // copy data from the state to a new array,
    // sort it by total_volume in descending order,
    // take top 3 results using slice
    // and then map
    labels: chartData
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 3)
      .map((coin) => coin.name),
    datasets: [
      {
        data: chartData
          .sort((a, b) => b.total_volume - a.total_volume)
          .slice(0, 3)
          .map((coin) => coin.total_volume),
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.dark,
          theme.palette.customYellow.dark,
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
        title="Top 3 Cryptocurrencies By Volume"
        subheader="Top 3 Cryptocurrencies Measured By Their Total Volume"
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

export default CryptoByVolumePieChart;
