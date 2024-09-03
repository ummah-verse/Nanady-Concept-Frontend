import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale
);

// Data JSON
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
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
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

const PalestinianGenocideChart = () => {
    return (
        <div className="chart-container p-4">
            <h2 className="text-white mb-6">Palestinian - Israel Conflict After Oct 07</h2>
            <Line data={data} options={options} />
            <div style={ { fontSize : '14px'}} className='mt-5'>
                <ul>
                    <li><a href="https://www.pcbs.gov.ps/site/lang__en/1405/Default.aspx">State of Palestine
                    Palestinian Central Bureau of Statistics</a></li>
                </ul>
            </div>
        </div>
    );
};

export default PalestinianGenocideChart;
