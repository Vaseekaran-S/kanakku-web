import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const LineChart = ({ data = [] }) => {
    const chartData = {
        labels: data.map(item => item.label),
        datasets: [
            {
                label: '',
                data: data.map(item => item.value),
                fill: false,
                backgroundColor: '#4f46e5',
                borderColor: '#4f46e5',
                tension: 0.5
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
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `Value: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: true
                }
            },
            y: {
                grid: {
                    display: true,
                },
                border: {
                    display: true
                }
            }
        }
    };

    return (
        <div className="w-full h-72">
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;