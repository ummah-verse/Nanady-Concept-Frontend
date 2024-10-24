
import { Bar } from 'react-chartjs-2';
import 'chartjs-chart-geo';

const label = [
    "Afghanistan", "Africa (WHO)", "Albania", "Algeria", "Americas (WHO)", "Andorra", "Armenia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bhutan", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Brazil", "Bulgaria", "Cambodia", "Canada", "Central African Republic", "Central and Southern Asia (SDG)", "Chad", "Chile", "Colombia", "Costa Rica", "Cote d'Ivoire", "Cyprus", "Czechia", "Democratic Republic of Congo", "Denmark", "Dominican Republic", "Eastern Mediterranean (WHO)", "Eastern and South-Eastern Asia (SDG)", "Ecuador", "Estonia", "Ethiopia", "Europe (WHO)", "Europe and Northern America (SDG)", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Guadeloupe", "Guam", "Guatemala", "Guinea-Bissau", "High-income countries", "Honduras", "Hong Kong", "Hungary", "Iceland", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Japan", "Jordan", "Kiribati", "Kuwait", "Kyrgyzstan", "Land Locked Developing Countries", "Laos", "Latin America and the Caribbean (SDG)", "Latvia", "Least Developed Countries", "Lebanon", "Lesotho", "Liechtenstein", "Lithuania", "Low-income countries", "Lower-middle-income countries", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Malta", "Martinique", "Mayotte", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Myanmar", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nigeria", "Niue", "North Korea", "North Macedonia", "Northern Africa and Western Asia (SDG)", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Saint Barthelemy", "Saint Helena", "Saint Martin (French part)", "Samoa", "San Marino", "Sao Tome and Principe", "Senegal", "Serbia", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Small Island Developing States", "South Korea", "Spain", "Sri Lanka", "Sub-Saharan Africa (SDG)", "Suriname", "Sweden", "Switzerland", "Tajikistan", "Tanzania", "Togo", "Tonga", "Tunisia", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Kingdom", "United States", "Upper-middle-income countries", "Uzbekistan", "Vietnam", "Wallis and Futuna", "World", "Zimbabwe"
]

const data = [
    "30.034098", "33.264328", "70.73607", "70.59793", "81.45162", "90.64", "82.41172", "98.896324", "71.6117", "98.90398", "59.109295", "93.099754", "99.73945", "73.341995", "100.0", "86.97068", "87.25871", "95.654335", "29.131279", "99.03973", "6.126445", "67.517525", "6.2470484", "98.77136", "73.85605", "80.507576", "43.892155", "99.76506", "97.883415", "11.584335", "99.91883", "44.941177", "66.86215", "78.50708", "67.08951", "97.01939", "13.237898", "91.947914", "94.33307", "41.863583", "99.64203", "99.70415", "91.48601", "81.81326", "47.674652", "69.14185", "99.91641", "44.468082", "100.0", "98.87964", "95.709625", "99.05979", "56.293304", "23.871601", "94.30306", "65.206795", "100.0", "100.0", "100.0", "30.266167", "94.22125", "59.74263", "95.9914", "99.70983", "99.47115", "92.710556", "98.65855", "85.70913", "14.414075", "100.0", "76.48715", "36.936485", "17.872076", "75.23179", "97.111275", "37.47478", "47.7", "28.217487", "100.0", "94.9815", "28.60295", "63.799328", "99.53408", "100.0", "22.239223", "17.75708", "93.94192", "99.772415", "98.76963", "92.461105", "43.03788", "75.22434", "100.0", "39.280155", "85.11892", "74.824196", "57.3965", "16.116636", "99.96789", "96.86529", "100.0", "28.984884", "93.5415", "66.5314", "80.44703", "76.90275", "90.639175", "98.82311", "90.851746", "50.60178", "90.44085", "80.330185", "64.220604", "51.98521", "47.901905", "88.9145", "95.15673", "99.87311", "96.654816", "95.75359", "82.07233", "76.23311", "100.0", "89.22964", "96.62876", "62.191715", "100.0", "36.300694", "26.69259", "75.07525", "10.262419", "100.0", "99.18473", "98.27432", "55.993107", "99.28012", "99.56715", "47.127533", "31.34643", "55.79615", "99.73888", "96.700005", "55.2921", "11.335652", "19.417791", "29.528702", "74.30346", "94.88054", "47.085075", "8.707101", "18.681423", "87.62073", "99.804146", "97.46839", "80.620705", "79.8453", "57.78141", "68.88058", "72.927155", "26.516428"
]


const Water = () => {
    const chartData = {
        labels: label,
        datasets: [
            {
                label: 'Population Using Safely Managed Drinking Water Services (%)',
                data: data.map(Number), // Convert string data to numbers
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    margin : 15,
                    padding: 20, // Adjust padding around the legend labels
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        // You can customize the tooltip content here
                        return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Percentage (%)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: ''
                }
            }
        }
    };
    
    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage


    return (
        <div style={ { fontSize : '14px'}}  className={`p-4 mb-6 ${darkMode === 'dark' ? 'text-white ' : 'text-neutral-900 font-semibold'}`}>
            <h2 style={ { fontSize : '16px'}} className='mb-2'>Share of Population Using Safely Managed Drinking Water Services</h2>
            <Bar data={chartData} options={options} />
            <p>
                This chart illustrates the percentage of the population using safely managed drinking water services across different countries and regions. Safely managed drinking water services are defined as services that provide water from an improved source which is located on the premises, available when needed, and free from contamination.
            </p>

            <br />

            <p>
                The data is presented as the percentage of the population with access to safely managed drinking water services. This allows for a comparison of water access across different countries, highlighting areas with better or poorer water access.
            </p>
        </div>
    );
};

export default Water;