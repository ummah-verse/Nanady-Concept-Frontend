import ProteinMalnutritionChart from '../atom/Starvation';
import GeoChart from '../atom/Water';
import PalestinianGenocideChart from './../atom/Palestinian';
import UkraineBarChart from './../atom/Ukraine';
import Climate from './Climate';

const Statistic = () => {
    return (
        <div className="App">
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