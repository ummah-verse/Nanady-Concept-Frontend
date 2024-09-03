import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import './styles/Analytic.css'
import ContentPreferencesPieChart from './../atom/Preference';

Chart.register(...registerables);

const Analytic = () => {
    // Data statistik jumlah post harian untuk 7 hari kebelakang
    const dailyPostData = {
        labels: ['D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'Now'],
        datasets: [
            {
                label: 'Daily Activity (Total Count)',
                data: [2, 5, 9, 0, 3, 8, 4, 1],
                fill: true, // Fill area under the line
                backgroundColor: 'rgba(75,192,192,0.2)', // Background color below the line
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            }
        ]
    };

    // Data statistik total waktu penggunaan aplikasi dalam jam untuk 7 hari kebelakang
    const usageTimeData = {
        labels: ['D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'Now'],
        datasets: [
            {
                label: 'Usage Time (Hours)',
                data: [1.5, 3, 2.7, 0.8, 2, 3.5, 1.8, 2.2],
                fill: true, // Fill area under the line
                backgroundColor: 'rgba(255,99,132,0.2)', // Background color below the line
                borderColor: 'rgba(255,99,132,1)',
                tension: 0.1,
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                ticks: {
                    padding: 20 // Add padding between labels and the chart
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    padding: 20 // Add padding between legend and chart
                }
            }
        }
    };

    return (
        <div>
            {/* Grafik Daily Post */}

            <div className="chart-container p-4 ">
                <h2 className="text-white mb-3 title-analytic">Content Preference</h2>
                <ContentPreferencesPieChart /> {/* Atau ContentPreferencesPieChart */}
            </div>

            <div className='p-4'>
                <p style={ { fontSize : '14px'}}>
                    You are doing good !
                </p>
            </div>
            
            <div className="chart-container p-4 ">
                <h2 className="text-white mb-3 title-analytic">Total Post By Daily</h2>
                <Line data={dailyPostData} options={options} />
            </div>

            <div className='p-4'>
                <p style={ { fontSize : '14px'}}>
                    You are doing good !
                </p>
            </div>

            {/* Grafik Usage Time */}
            <div className="chart-container p-4 mt-3">
                <h2 className="text-white mb-3 title-analytic">Time Usage Daily by Hour</h2>
                <Line data={usageTimeData} options={options} />
            </div>


            <div className='p-4'>
                <p style={ { fontSize : '14px'}}>
                    You are doing good !
                </p>
            </div>
        </div>

        
    );
};

export default Analytic;
