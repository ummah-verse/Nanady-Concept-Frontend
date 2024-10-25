import ProteinMalnutritionChart from '../atom/Starvation';
import GeoChart from '../atom/Water';
import PalestinianGenocideChart from './../atom/Palestinian';
import UkraineBarChart from './../atom/Ukraine';
import Climate from './Climate';

const Statistic = () => {
    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    return (
        // <div className={`m-0 p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] border-neutral-950 shadow-xl border-4 mb-2'}`}>
        <div className={`m-0 p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#ffffff] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            <PalestinianGenocideChart/>
            <hr />
            <UkraineBarChart/>
            <hr />

           <ProteinMalnutritionChart/>
           <hr />

           <GeoChart/>
           <hr />

           <Climate/>
        </div>
    );
}

export default Statistic;