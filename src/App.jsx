// src/App.jsx

import './Main.css'
import { ThemeProvider } from './ThemeProvider';
import Root from './Root';



const App = () => {

  return (
    <ThemeProvider>
      <Root/>
    </ThemeProvider>

  );
};

export default App;

      {/* <div className='lol bg-custom-radial'>
        <div id='stars'></div>
        <div id='stars2'></div> 
         <div id='stars3'></div>
      </div> */}