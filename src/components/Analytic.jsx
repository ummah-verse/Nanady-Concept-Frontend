import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TimeStatisticChart from './TimeStatisticChart';

import './styles/Analytic.css';
import ContentPreferencesPieChart from './../atom/Preference';

Chart.register(...registerables);

const Analytic = () => {

    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    const [chartData, setChartData] = useState({
        labels: ['D-7', 'D-6', 'D-5', 'D-4', 'D-3', 'D-2', 'D-1', 'Now'],
        datasets: [
            {
                label: 'Yapping',
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
            {
                label: 'Reminder',
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                fill: true,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                tension: 0.1,
            }
        ]
    });

    const [summary, setSummary] = useState({ yappin: '', reminder: '' }); // State for summary messages

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the Bearer token from local storage
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/profile/daily-analytic`, {
                    headers: {

                        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                    }
                });

                const { yappin, reminder, summary: summaryData } = response.data.data; // Access the data correctly

                // Set summary messages
                setSummary({
                    yappin: summaryData.yappin,
                    reminder: summaryData.reminder
                });

                // Prepare data for the chart
                const yappingData = new Array(8).fill(0); // Initialize for the past 7 days + today
                const reminderData = new Array(8).fill(0); // Same for reminders
                
                const yappingDates = Object.keys(yappin);
                const reminderDates = Object.keys(reminder);

                // Fill yapping data
                yappingDates.forEach((date, index) => {
                    const dayIndex = 7 - index; // Mapping to the chart labels
                    yappingData[dayIndex] = yappin[date];
                });

                // Fill reminder data
                reminderDates.forEach((date, index) => {
                    const dayIndex = 7 - index; // Mapping to the chart labels
                    reminderData[dayIndex] = reminder[date];
                });

                setChartData((prevData) => ({
                    ...prevData,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: yappingData
                        },
                        {
                            ...prevData.datasets[1],
                            data: reminderData
                        }
                    ]
                }));

            } catch (error) {
                console.error("Error fetching daily analytic data:", error);
            }
        };

        fetchData();
    }, []);

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
            {/* Content Preference Chart */}
            {/* <div className={`chart-container p-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] border-neutral-950 shadow-xl border-4 mb-2'}`}> */}
            <div className={`chart-container p-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>

                <h2 className={`mb-3 title-analytic ${darkMode === "dark" ? 'text-white' : 'text-black'}`}>Content Preference</h2>
                <ContentPreferencesPieChart />
            </div>
            
            {/* Combined Activity Chart */}
            <div className={`chart-container p-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
                <h2 className={` mb-3 title-analytic  ${darkMode === "dark" ? 'text-white' : 'text-black'} `}>Post Activity</h2>
                <Line data={chartData} options={options} />

                <div className='p-4'>
                    <h3 className="text-white mb-2">Summary</h3>
                    <p style={{ fontSize: '14px' }}>
                        {summary.yappin}
                    </p>
                    <p style={{ fontSize: '14px' }}>
                        {summary.reminder}
                    </p>
                </div>
            </div>



            <div className={`chart-container p-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
                <TimeStatisticChart/>
            </div>
        </div>
    );
};

export default Analytic;
