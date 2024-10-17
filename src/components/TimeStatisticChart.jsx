// TimeStatisticChart.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the chart elements
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TimeStatisticChart = () => {
  const [timeStats, setTimeStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the API
  const fetchTimeStatistic = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the Bearer token from local storage
      if (!token) {
        throw new Error('No token found'); // Handle case where token is not found
      }

      // Fetch the data from the API
      const response = await axios.get(`${import.meta.env.VITE_API_URL_SOCKET}/time-statistic`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (response.status === 200) {
        return response.data.data; // Return the relevant data part
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching time statistics:', error.message);
      return null; // Return null if there's an error
    }
  };

  // UseEffect to fetch data when the component mounts
  useEffect(() => {
    const getTimeStats = async () => {
      const data = await fetchTimeStatistic(); // Call the fetch function
      if (data) {
        setTimeStats(data); // Update state with fetched data
      }
      setLoading(false); // Set loading to false after fetching
    };

    getTimeStats(); // Fetch the data when the component mounts
  }, []);

  // Prepare the labels and data for the chart
  const labels = timeStats?.weekly.map((item) => item.day).reverse(); // Reverse to position "today" on the right
  const durations = timeStats?.weekly.map((item) => item.durationInSeconds / 3600).reverse(); // Reverse for consistent data alignment

  const chartData = {
    labels: labels || [], // Fallback to empty array if labels are undefined
    datasets: [
      {
        label: 'Usage Time (hours)',
        data: durations || [], // Fallback to empty array if durations are undefined
        borderColor: '#55eb94',
        backgroundColor: 'rgba(53, 212, 132, 0.253)',
        fill: true,
        // tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Usage Time (Hours)',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Hours',
        },
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <p></p>; // Show loading message while fetching
  }

  return (
    <div>
      <h2>Weekly Usage Statistics</h2>
      {timeStats ? (
        <Line data={chartData} options={options} /> // Render the Line chart with data
      ) : (
        <p>No data available</p> // Handle case where no data is available
      )}
    </div>
  );
};

export default TimeStatisticChart;
