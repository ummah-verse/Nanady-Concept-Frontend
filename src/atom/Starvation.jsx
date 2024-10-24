import { Bar } from 'react-chartjs-2';

import { datastarve } from './data';

const labels = datastarve.map(item => item.country);
const datasetData = datastarve.map(item => item.DeathsProteinenergymalnutritionSexBothAgeAgestandardized);

const data = {
  labels: labels,
  datasets: [
    {
      label: 'Deaths from Protein-Energy Malnutrition (Age-standardized)',
      data: datasetData,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
};

const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const ProteinMalnutritionChart = () => {
  const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    return (
      <div  style={ { fontSize : '14px'}} className={`p-4 mb-6 ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`}>
        <h2  className={`mb-6 ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`} style={ { fontSize : '16px'}}>Protein-Energy Malnutrition Deaths by Country</h2>
        <Bar className='mt-5' data={data} options={options} />
        <p>
          This chart illustrates the number of deaths caused by protein-energy malnutrition (PEM) across different countries. PEM is a serious condition resulting from a deficiency of both protein and energy in the diet, which can lead to severe health issues and increased mortality risk.
        </p>
        <br />
        <p>
          The data is presented as the number of deaths per 100,000 population. This means that the rate of deaths due to PEM is normalized to a standard population size of 100,000 people. This standardization allows for a more accurate comparison of PEM-related mortality rates across different countries, regardless of their overall population sizes.
        </p>
      </div>
    );
  };
  
  export default ProteinMalnutritionChart
