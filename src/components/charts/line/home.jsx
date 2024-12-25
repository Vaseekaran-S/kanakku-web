import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { dateAndTime } from 'utils/timezone';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const HomeLineChart = ({ data = [], customClassName }) => {
    const length = data.length;
    const diff = data[length-1]?.balance - data[0]?.balance;
    
    const chartData = {
        labels: data.map(item => dateAndTime(item?.createdAt)),
        datasets: [
            {
                label: 'Rs',
                data: data.map(item => item?.balance),
                fill: true,
                borderColor: diff > 0 ? 'green' : 'red',
                backgroundColor: data.map(item => item?.type === 'Income' ? 'green' : 'red' ),
                tension: 0.1,
                pointStyle: length > 1 ? false : true
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                  display: false,
                },
                border: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                  display: false,
                },
                border: {
                    display: false
                }
            }
        }
    };

    return (
        <div className={customClassName}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default HomeLineChart;