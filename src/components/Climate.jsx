import LineChart from "../atom/Climate";
import Emission from './../atom/Emission';

const Climate = () => {
    return (
      <div className="App">
        <header className="App-header">
          <Emission />
          <hr />

          <LineChart />
        </header>
      </div>
    );
  }
  
  export default Climate;