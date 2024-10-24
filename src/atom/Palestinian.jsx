import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, Filler } from 'chart.js';

// Register Chart.js components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    Filler
);

// Data for the chart
const data = {
    labels: [
        "Total Martyrs in Gaza Strip",
        "Kids in Gaza Strip",
        "Women in Gaza Strip",
        "Total Martyrs in West Bank",
        "Elderly in Gaza Strip",
        "Medical Staff Martyrs",
        "Press Martyrs",
        "Educational Staff Martyrs",
        "Kids Martyrs in West Bank",
        "UN Staff Martyrs",
        "Civil Defence",
        "Missing",
        "Missing Kids & Women",
        "Israeli Casualties"
    ],
    datasets: [
        {
            label: 'Martyrs and Casualties',
            data: [
                40738, 16673, 11269, 676, 1049, 885, 172, 496, 152, 203, 82, 10000, 4700, 1478
            ],
            fill: true,
            backgroundColor: 'rgba(69, 177, 177, 0.2)', 
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1 
        }
    ]
};

// Chart options
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
                autoSkip: false, // Show all X-axis labels
                maxRotation: 45, // Rotate labels if needed
                minRotation: 45
            }
        },
        y: {
            beginAtZero: true,
        }
    }
};

// Chart component
const PalestinianGenocideChart = () => {

    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    return (
        <div className="chart-container p-4">
            <h2 className={`mb-6 ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`}>Palestinian - Israel Conflict After Oct 07</h2>
            <Line data={data} options={options} />
            <div style={{ fontSize: '14px' }} className='mt-5'>
                <ul>
                    <li>
                        <a className={`${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`} href="https://www.pcbs.gov.ps/site/lang__en/1405/Default.aspx">
                            State of Palestine Palestinian Central Bureau of Statistics
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PalestinianGenocideChart;
