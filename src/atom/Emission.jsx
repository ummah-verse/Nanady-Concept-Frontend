const data = [{"year":1850,"gross":4.3,"net":2.8,"abs":1.5},{"year":1851,"gross":4.4,"net":2.9,"abs":1.5},{"year":1852,"gross":4.4,"net":3.0,"abs":1.5},{"year":1853,"gross":4.5,"net":3.1,"abs":1.5},{"year":1854,"gross":4.6,"net":3.1,"abs":1.5},{"year":1855,"gross":4.6,"net":3.1,"abs":1.5},{"year":1856,"gross":4.7,"net":3.2,"abs":1.5},{"year":1857,"gross":4.7,"net":3.2,"abs":1.5},{"year":1858,"gross":4.7,"net":3.2,"abs":1.5},{"year":1859,"gross":4.8,"net":3.3,"abs":1.5},{"year":1860,"gross":4.7,"net":3.2,"abs":1.5},{"year":1861,"gross":4.6,"net":3.1,"abs":1.5},{"year":1862,"gross":4.6,"net":3.1,"abs":1.6},{"year":1863,"gross":4.7,"net":3.1,"abs":1.6},{"year":1864,"gross":4.7,"net":3.1,"abs":1.6},{"year":1865,"gross":4.7,"net":3.1,"abs":1.6},{"year":1866,"gross":4.7,"net":3.1,"abs":1.6},{"year":1867,"gross":4.8,"net":3.1,"abs":1.6},{"year":1868,"gross":4.8,"net":3.1,"abs":1.7},{"year":1869,"gross":4.8,"net":3.1,"abs":1.7},{"year":1870,"gross":5.1,"net":3.4,"abs":1.7},{"year":1871,"gross":5.2,"net":3.5,"abs":1.7},{"year":1872,"gross":5.3,"net":3.6,"abs":1.7},{"year":1873,"gross":5.4,"net":3.7,"abs":1.7},{"year":1874,"gross":5.4,"net":3.8,"abs":1.7},{"year":1875,"gross":5.5,"net":3.8,"abs":1.7},{"year":1876,"gross":5.6,"net":3.9,"abs":1.7},{"year":1877,"gross":5.6,"net":3.9,"abs":1.7},{"year":1878,"gross":5.7,"net":4.0,"abs":1.7},{"year":1879,"gross":5.8,"net":4.1,"abs":1.7},{"year":1880,"gross":5.9,"net":4.2,"abs":1.7},{"year":1881,"gross":5.9,"net":4.2,"abs":1.7},{"year":1882,"gross":6.1,"net":4.3,"abs":1.7},{"year":1883,"gross":6.2,"net":4.5,"abs":1.7},{"year":1884,"gross":6.2,"net":4.5,"abs":1.7},{"year":1885,"gross":6.2,"net":4.5,"abs":1.7},{"year":1886,"gross":6.3,"net":4.6,"abs":1.7},{"year":1887,"gross":6.4,"net":4.7,"abs":1.7},{"year":1888,"gross":6.5,"net":4.8,"abs":1.7},{"year":1889,"gross":6.5,"net":4.8,"abs":1.7},{"year":1890,"gross":6.9,"net":5.1,"abs":1.7},{"year":1891,"gross":7.1,"net":5.3,"abs":1.7},{"year":1892,"gross":7.1,"net":5.4,"abs":1.7},{"year":1893,"gross":7.2,"net":5.4,"abs":1.8},{"year":1894,"gross":7.3,"net":5.5,"abs":1.8},{"year":1895,"gross":7.4,"net":5.6,"abs":1.8},{"year":1896,"gross":7.5,"net":5.7,"abs":1.8},{"year":1897,"gross":7.6,"net":5.8,"abs":1.8},{"year":1898,"gross":7.7,"net":5.9,"abs":1.8},{"year":1899,"gross":7.9,"net":6.2,"abs":1.8},{"year":1900,"gross":8.1,"net":6.3,"abs":1.8},{"year":1901,"gross":8.2,"net":6.4,"abs":1.8},{"year":1902,"gross":8.4,"net":6.6,"abs":1.8},{"year":1903,"gross":8.6,"net":6.8,"abs":1.8},{"year":1904,"gross":8.7,"net":6.9,"abs":1.8},{"year":1905,"gross":8.9,"net":7.0,"abs":1.8},{"year":1906,"gross":9.0,"net":7.2,"abs":1.8},{"year":1907,"gross":9.4,"net":7.6,"abs":1.8},{"year":1908,"gross":9.3,"net":7.5,"abs":1.9},{"year":1909,"gross":9.5,"net":7.6,"abs":1.9},{"year":1910,"gross":9.5,"net":7.7,"abs":1.9},{"year":1911,"gross":9.6,"net":7.7,"abs":1.9},{"year":1912,"gross":9.7,"net":7.8,"abs":1.9},{"year":1913,"gross":10.0,"net":8.0,"abs":1.9},{"year":1914,"gross":9.7,"net":7.7,"abs":1.9},{"year":1915,"gross":9.6,"net":7.6,"abs":2.0},{"year":1916,"gross":9.8,"net":7.8,"abs":2.0},{"year":1917,"gross":10.0,"net":8.0,"abs":2.0},{"year":1918,"gross":10.0,"net":7.9,"abs":2.0},{"year":1919,"gross":9.5,"net":7.4,"abs":2.0},{"year":1920,"gross":10.2,"net":8.1,"abs":2.0},{"year":1921,"gross":9.9,"net":7.8,"abs":2.1},{"year":1922,"gross":10.1,"net":8.0,"abs":2.1},{"year":1923,"gross":10.5,"net":8.5,"abs":2.1},{"year":1924,"gross":10.6,"net":8.5,"abs":2.1},{"year":1925,"gross":10.7,"net":8.6,"abs":2.1},{"year":1926,"gross":10.7,"net":8.5,"abs":2.1},{"year":1927,"gross":11.0,"net":8.9,"abs":2.1},{"year":1928,"gross":11.0,"net":8.9,"abs":2.2},{"year":1929,"gross":11.3,"net":9.2,"abs":2.2},{"year":1930,"gross":11.1,"net":8.9,"abs":2.2},{"year":1931,"gross":10.7,"net":8.5,"abs":2.2},{"year":1932,"gross":10.5,"net":8.3,"abs":2.2},{"year":1933,"gross":10.7,"net":8.4,"abs":2.2},{"year":1934,"gross":11.0,"net":8.8,"abs":2.2},{"year":1935,"gross":11.2,"net":9.0,"abs":2.3},{"year":1936,"gross":11.6,"net":9.4,"abs":2.3},{"year":1937,"gross":11.9,"net":9.6,"abs":2.3},{"year":1938,"gross":11.7,"net":9.4,"abs":2.3},{"year":1939,"gross":12.0,"net":9.6,"abs":2.3},{"year":1940,"gross":12.5,"net":10.2,"abs":2.3},{"year":1941,"gross":12.9,"net":10.5,"abs":2.4},{"year":1942,"gross":12.9,"net":10.5,"abs":2.4},{"year":1943,"gross":13.0,"net":10.6,"abs":2.5},{"year":1944,"gross":13.1,"net":10.6,"abs":2.5},{"year":1945,"gross":12.3,"net":9.8,"abs":2.5},{"year":1946,"gross":12.7,"net":10.1,"abs":2.6},{"year":1947,"gross":13.2,"net":10.6,"abs":2.6},{"year":1948,"gross":13.4,"net":10.8,"abs":2.6},{"year":1949,"gross":13.2,"net":10.5,"abs":2.7},{"year":1950,"gross":14.7,"net":12.0,"abs":2.7},{"year":1951,"gross":15.2,"net":12.5,"abs":2.7},{"year":1952,"gross":15.5,"net":12.7,"abs":2.7},{"year":1953,"gross":15.8,"net":13.0,"abs":2.7},{"year":1954,"gross":16.1,"net":13.3,"abs":2.7},{"year":1955,"gross":16.9,"net":14.2,"abs":2.7},{"year":1956,"gross":17.6,"net":14.9,"abs":2.8},{"year":1957,"gross":18.1,"net":15.3,"abs":2.8},{"year":1958,"gross":18.6,"net":15.8,"abs":2.8},{"year":1959,"gross":19.5,"net":16.6,"abs":2.9},{"year":1960,"gross":19.1,"net":16.2,"abs":3.0},{"year":1961,"gross":18.9,"net":15.9,"abs":3.0},{"year":1962,"gross":18.8,"net":15.8,"abs":3.1},{"year":1963,"gross":19.2,"net":16.1,"abs":3.1},{"year":1964,"gross":19.6,"net":16.5,"abs":3.1},{"year":1965,"gross":19.6,"net":16.4,"abs":3.2},{"year":1966,"gross":20.0,"net":16.8,"abs":3.2},{"year":1967,"gross":20.5,"net":17.3,"abs":3.2},{"year":1968,"gross":21.3,"net":18.1,"abs":3.2},{"year":1969,"gross":21.9,"net":18.6,"abs":3.3},{"year":1970,"gross":23.2,"net":19.9,"abs":3.3},{"year":1971,"gross":23.5,"net":20.2,"abs":3.3},{"year":1972,"gross":24.3,"net":20.9,"abs":3.4},{"year":1973,"gross":25.1,"net":21.7,"abs":3.4},{"year":1974,"gross":24.8,"net":21.5,"abs":3.4},{"year":1975,"gross":24.9,"net":21.5,"abs":3.4},{"year":1976,"gross":25.9,"net":22.4,"abs":3.4},{"year":1977,"gross":26.4,"net":22.9,"abs":3.5},{"year":1978,"gross":26.8,"net":23.4,"abs":3.5},{"year":1979,"gross":27.2,"net":23.7,"abs":3.5},{"year":1980,"gross":27.2,"net":23.7,"abs":3.5},{"year":1981,"gross":27.0,"net":23.5,"abs":3.5},{"year":1982,"gross":26.9,"net":23.4,"abs":3.5},{"year":1983,"gross":27.5,"net":24.0,"abs":3.5},{"year":1984,"gross":29.0,"net":25.4,"abs":3.5},{"year":1985,"gross":29.2,"net":25.6,"abs":3.5},{"year":1986,"gross":29.7,"net":26.1,"abs":3.6},{"year":1987,"gross":30.2,"net":26.6,"abs":3.6},{"year":1988,"gross":30.8,"net":27.2,"abs":3.6},{"year":1989,"gross":31.1,"net":27.4,"abs":3.7},{"year":1990,"gross":31.5,"net":27.7,"abs":3.7},{"year":1991,"gross":31.7,"net":28.0,"abs":3.8},{"year":1992,"gross":31.3,"net":27.6,"abs":3.8},{"year":1993,"gross":31.5,"net":27.7,"abs":3.8},{"year":1994,"gross":32.4,"net":28.6,"abs":3.8},{"year":1995,"gross":32.8,"net":28.9,"abs":3.9},{"year":1996,"gross":33.9,"net":30.0,"abs":3.9},{"year":1997,"gross":35.6,"net":31.6,"abs":4.0},{"year":1998,"gross":34.2,"net":30.2,"abs":4.0},{"year":1999,"gross":34.6,"net":30.5,"abs":4.1},{"year":2000,"gross":34.7,"net":30.6,"abs":4.2},{"year":2001,"gross":34.6,"net":30.4,"abs":4.2},{"year":2002,"gross":35.7,"net":31.3,"abs":4.4},{"year":2003,"gross":37.6,"net":33.1,"abs":4.4},{"year":2004,"gross":38.1,"net":33.6,"abs":4.5},{"year":2005,"gross":38.6,"net":34.1,"abs":4.6},{"year":2006,"gross":40.0,"net":35.4,"abs":4.6},{"year":2007,"gross":40.3,"net":35.6,"abs":4.7},{"year":2008,"gross":41.0,"net":36.3,"abs":4.8},{"year":2009,"gross":41.0,"net":36.2,"abs":4.8},{"year":2010,"gross":42.9,"net":37.9,"abs":5.0},{"year":2011,"gross":44.1,"net":39.1,"abs":5.0},{"year":2012,"gross":44.7,"net":39.7,"abs":5.1},{"year":2013,"gross":44.6,"net":39.4,"abs":5.2},{"year":2014,"gross":45.2,"net":40.0,"abs":5.2},{"year":2015,"gross":45.7,"net":40.4,"abs":5.3},{"year":2016,"gross":44.7,"net":39.4,"abs":5.4},{"year":2017,"gross":45.3,"net":39.9,"abs":5.4},{"year":2018,"gross":45.8,"net":40.3,"abs":5.5},{"year":2019,"gross":46.4,"net":40.9,"abs":5.5},{"year":2020,"gross":44.1,"net":38.5,"abs":5.5},{"year":2021,"gross":45.9,"net":40.3,"abs":5.5},{"year":2022,"gross":46.2,"net":40.7,"abs":5.5},{"year":2023,"gross":46.4,"net":40.9,"abs":5.5},{"year":2024,"gross":null,"net":null,"abs":null}]

// src/components/BarChart.js

// import PropTypes from 'prop-types'; 
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  // Prepare data for the chart
  const chartData = {
    labels: data.map(item => item.year),
    datasets: [
      {
        label: 'Gross Emissions',
        data: data.map(item => item.gross),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Net Emissions',
        data: data.map(item => item.net),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Abs Emissions',
        data: data.map(item => item.abs),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Emissions',
        },
      },
    },
  };

  return (
    <div className='p-4'>
      <h2>Yearly CO2 Emissions</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

// // Define prop types
// BarChart.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       year: PropTypes.string.isRequired,
//       gross: PropTypes.number.isRequired,
//       net: PropTypes.number.isRequired,
//       abs: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

export default BarChart;
