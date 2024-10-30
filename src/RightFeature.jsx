import './sidefeature.css'
import RandomFact from './side/RandomFact';
import RandomTips from './side/RandomTips';

const RightFeature = () => {
    const darkMode= localStorage.getItem('theme') || 'light'

    return(
        <>
        <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#f3fffd] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            <p className='font-bold' style={ { fontSize : '14px'}}>Encyclopedia 📚</p>
        </div>
            <RandomFact/>
        <div className={`mt-2 flex items-start p-3 pb-5 px-6 pl-5 pt-4 ${darkMode === "dark" ? 'bg-neutral-800 text-gray-300' : 'bg-[#f3fffd] rounded-md border-[#11111128] text-gray-900 font-semibold border-[1px] mb-2'}`}>
            <p className='font-bold' style={ { fontSize : '14px'}}>Tips & Tricks 💡</p>
        </div>
            <RandomTips/>
        </>
    )
}

export default RightFeature