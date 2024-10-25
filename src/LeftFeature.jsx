import TodayTimer from './side/TodayTimer';
import Motivation from './side/Motivation';


const LeftFeature = () => {
    const darkMode = localStorage.getItem('theme') || 'light'; // Get theme from localStorage

    return(
        <>
        <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#f3fffd] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
        <p className='font-bold' style={ { fontSize : '14px'}}>Today&apos;s Quote 🚀</p>
        </div>
            <Motivation/>

        <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#f3fffd] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            <p className='font-bold' style={ { fontSize : '14px'}}>Activity 🔥</p>
        </div>
            <TodayTimer/>
        </>
    )
}

export default LeftFeature