import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const uniqueColors = [ 'Green', 'Blue', 'Red', '#FFCE06', '#4BC0C0', '#FF9F40', '#E7E9ED', '#FF6384', '#36A2EB', '#FFCE56' ]

const DonutChart = ({ data = [], customCss }) => {
  const donutData = {
    labels: data.map(elem => elem?.category),
    datasets: [
      {
        data: data.map(elem => elem?.amount),
        backgroundColor: uniqueColors,
        borderColor: "#ffffff",
        borderWidth: 1
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.data;
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 9
        },
      }
    }
  };

  return (
    <div className={customCss}>
      <Doughnut data={donutData} options={options} />
    </div>
  );
};

export default DonutChart;