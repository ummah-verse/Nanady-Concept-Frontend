import { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, RadialLinearScale, PointElement, LineElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement
);

const ContentPreferencesRadarChart = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Yapping',
                data: [],
                backgroundColor: 'rgba(235, 54, 108, 0.2)',
                borderColor: '#eb3636',
                pointBackgroundColor: '#262627',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            },
        ],
    });

    const [feedback, setFeedback] = useState(''); // State to hold the feedback

    useEffect(() => {
        const fetchPreferences = async () => {
            const token = localStorage.getItem('token'); // Get the token from local storage

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/profile-preference`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const preferenceData = await response.json();

                console.log(preferenceData);

                // Check if preferenceData is not empty and contains feedback
                if (preferenceData.status && preferenceData.data.length > 0) {
                    const preference = preferenceData.data[0];

                    // Map the tag names to the chart labels
                    const labels = [
                        preference.preference_tag_one,
                        preference.preference_tag_two,
                        preference.preference_tag_three,
                        preference.preference_tag_four,
                    ].filter(tag => tag !== null); // Remove null tags

                    // Create the data array, replacing null with 0
                    const chartData = [
                        preference.total_engage_one || 0,
                        preference.total_engage_two || 0,
                        preference.total_engage_three || 0,
                        preference.total_engage_four || 0,
                    ];

                    // Use functional update to avoid dependency issues
                    setData(prevData => ({
                        labels: labels,
                        datasets: [
                            {
                                ...prevData.datasets[0],
                                data: chartData,
                            },
                        ],
                    }));

                    // Set the feedback message from the response
                    setFeedback(preferenceData.feedback);
                } else {
                    setFeedback('You haven\'t chosen any content preferences yet!'); // Update feedback for no preferences
                }
            } catch (err) {
                console.error("Error fetching preferences:", err);
                setFeedback('An error occurred while fetching your preferences.'); // Handle error state
            }
        };

        fetchPreferences(); // Fetch preferences on component mount
    }, []); // Run only on mount

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 200,
                backgroundColor: 'rgba(94, 94, 94, 0.2)',
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                pointLabels: {
                    color: '#fff',
                },
                ticks: {
                    backdropColor: 'rgba(100, 100, 255, 0)',
                    color: '#c5c5c5',
                },
            },
        },
    };

    return (
        <>
            <div className="chart-container flex justify-center" style={{ width: '100%', height: '400px' }}>
                <Radar data={data} options={options} />
            </div>
            <p style={ { fontSize : "14px"}} className="mt-4">{feedback}</p> {/* Display the feedback */}
        </>
    );
};

export default ContentPreferencesRadarChart;
