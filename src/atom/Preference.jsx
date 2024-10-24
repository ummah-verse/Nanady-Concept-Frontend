import { useEffect, useReducer } from 'react';
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

// Initial state for the radar chart and feedback
const initialState = {
    data: {
        labels: [], // Labels for preference tags
        datasets: [
            {
                label: 'Engagement Levels',
                data: [], // Data points for engagements
                backgroundColor: 'rgba(235, 54, 108, 0.2)',
                borderColor: '#eb3636',
                pointBackgroundColor: '#262627',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            },
        ],
    },
    feedback: '', // Initial feedback message
};

// Reducer function to handle state updates
const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                data: {
                    ...state.data,
                    labels: action.payload.labels,
                    datasets: [
                        {
                            ...state.data.datasets[0],
                            data: action.payload.chartData,
                        },
                    ],
                },
            };
        case 'SET_FEEDBACK':
            return {
                ...state,
                feedback: action.payload,
            };
        default:
            return state;
    }
};

const ContentPreferencesRadarChart = () => {
    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    const [state, dispatch] = useReducer(reducer, initialState);

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

                if (preferenceData.status && preferenceData.data) {
                    const preference = preferenceData.data;

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

                    // Dispatch data and feedback to reducer
                    dispatch({
                        type: 'SET_DATA',
                        payload: { labels, chartData },
                    });

                    // Dispatch feedback message
                    dispatch({
                        type: 'SET_FEEDBACK',
                        payload: preferenceData.feedback,
                    });
                } else {
                    dispatch({
                        type: 'SET_FEEDBACK',
                        payload: 'You haven\'t chosen any content preferences yet!',
                    });
                }
            } catch (err) {
                console.error("Error fetching preferences:", err);
                dispatch({
                    type: 'SET_FEEDBACK',
                    payload: 'An error occurred while fetching your preferences.',
                });
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
                suggestedMax: 200, // Customize the max based on your data range
                backgroundColor: `${darkMode === 'dark' ? 'rgba(94, 94, 94, 0.2)' : '#eef85c60'}` ,
                grid: {
                    color: `${darkMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#f0fffaac'}`,
                },
                pointLabels: {
                    color: `${darkMode === 'dark' ? '#fff' : '#030303'}`,
                },
                ticks: {
                    backdropColor: 'rgba(100, 100, 255, 0)',
                    color: `${darkMode === 'dark' ? '#fff' : '#444444'}`,
                },
            },
        },
    };

    return (
        <>
            <div className="chart-container flex justify-center" style={{ width: '100%', height: '400px' }}>
                <Radar data={state.data} options={options} />
            </div>
            <p style={{ fontSize: '14px' }} className="mt-4">{state.feedback}</p> {/* Display the feedback */}
        </>
    );
};

export default ContentPreferencesRadarChart;
