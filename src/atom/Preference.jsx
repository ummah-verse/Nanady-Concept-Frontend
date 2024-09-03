import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement } from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement
);

// Data JSON
const data = {
    labels: ['Computer Science', 'Medicine', 'Politic', 'Nature', 'Animal', 'Tips', 'Photography', 'Car'],
    datasets: [
        {
            label: 'Yapping',
            data: [40, 150, 35, 100, 195, 130, 110, 155],
            backgroundColor: 'rgba(235, 54, 108, 0.2)', // Warna latar belakang di bawah garis
            borderColor: '#eb3636', // Warna garis
            pointBackgroundColor: '#262627', // Warna titik data
            pointBorderColor: '#fff', // Warna batas titik data
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        },
        {
            label: 'Mini',
            data: [120, 80, 55, 200, 95, 130, 170, 75],
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Warna latar belakang di bawah garis
            borderColor: 'rgba(54, 162, 235, 1)', // Warna garis
            pointBackgroundColor: '#262627', // Warna titik data
            pointBorderColor: '#fff', // Warna batas titik data
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        },
        {
            label: 'Diary',
            data: [190, 30, 95, 120, 105, 150, 0, 55],
            backgroundColor: 'rgba(54, 235, 123, 0.2)', // Warna latar belakang di bawah garis
            borderColor: '#36eb54', // Warna garis
            pointBackgroundColor: '#262627', // Warna titik data
            pointBorderColor: '#fff', // Warna batas titik data
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        }
    ]
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw}`;
                }
            }
        }
    },
    scales: {
        r: {
            angleLines: {
                display: true
            },
            suggestedMin: 0,
            suggestedMax: 200,
            backgroundColor: 'rgba(94, 94, 94, 0.2)', // Warna background untuk area skala
            grid: {
                color: 'rgba(255, 255, 255, 0.1)', // Warna garis grid
            },
            pointLabels: {
                color: '#fff', // Warna label di sekitar chart
            },
            ticks: {
                backdropColor: 'rgba(100, 100, 255, 0)', // Warna latar belakang angka skala
                color: '#c5c5c5', // Warna angka skala
            }
        }
    }
};


const ContentPreferencesRadarChart = () => {
    return (
        <div className="chart-container">
            <Radar data={data} options={options} />
        </div>
    );
};

export default ContentPreferencesRadarChart;
