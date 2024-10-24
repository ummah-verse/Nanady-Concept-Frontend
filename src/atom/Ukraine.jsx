import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Link } from 'react-router-dom';

// Registrasi komponen Chart.js
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement
);

// Data JSON
const data = {
    labels: ['Total Killed', 'Children Killed', 'Total Injured', 'Children Injured'],
    datasets: [
        {
            label: 'Ukraine Civilian Casualties',
            data: [11520, 633, 23640, 1551],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
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
                    return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                }
            }
        }
    },
    scales: {
        x: {
            beginAtZero: true,
            ticks: {
                autoSkip: false, // Menampilkan semua label di sumbu X
                maxRotation: 45, // Memutar label jika diperlukan
                minRotation: 45
            }
        },
        y: {
            beginAtZero: true,
        }
    }
};

const text = {
    description : "Russia's"
}

const UkraineBarChart = () => {
    
    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    return (
        
        <div className="chart-container p-4">
            <h2 className={`mb-6 ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`}>Number of civilian casualties in Ukraine during {text.description} invasion</h2>
            <Bar className='mt-5' data={data} options={options} />
            <div style={ { fontSize : '14px'}} className='mt-5'>
                <ul>
                    <li><Link className={`${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`} href="https://www.statista.com/statistics/1293492/ukraine-war-casualties/">Statista</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default UkraineBarChart;
