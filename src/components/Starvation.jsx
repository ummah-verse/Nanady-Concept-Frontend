import ProteinMalnutritionChart from './../atom/Starvation';
import GeoChart from './../atom/Water';

const Starvation = () => {
    return (
        <div className="App">
           <ProteinMalnutritionChart/>
           <GeoChart/>
        </div>
    );
}

export default Starvation;