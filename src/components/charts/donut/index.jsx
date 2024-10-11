import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const uniqueColors = ['Green', 'Blue', 'Red', '#FFCE06', '#4BC0C0', '#FF9F40', '#E7E9ED', '#FF6384', '#36A2EB', '#FFCE56']

const DonutChartSkel = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="w-60 h-60 bg-gray-200 rounded-full dark:bg-gray-700 flex-center m-auto mb-4">
        <div className="w-32 h-32 bg-white rounded-full"></div>
      </div>
      <div className='flex gap-3 max-w-[90%] m-auto'>
        <span className="w-24 h-2 bg-gray-200 rounded dark:bg-gray-700 flex-center m-auto"></span>
        <span className="w-24 h-2 bg-gray-200 rounded dark:bg-gray-700 flex-center m-auto"></span>
        <span className="w-24 h-2 bg-gray-200 rounded dark:bg-gray-700 flex-center m-auto"></span>
        <span className="w-24 h-2 bg-gray-200 rounded dark:bg-gray-700 flex-center m-auto"></span>
      </div>
    </div>
  )
}
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
      {data.length ?
        <Doughnut data={donutData} options={options} />
        :
        <DonutChartSkel />
      }
    </div>
  );
};

export default DonutChart;