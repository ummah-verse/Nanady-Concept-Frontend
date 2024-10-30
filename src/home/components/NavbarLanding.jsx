// NavbarLanding.js
const NavbarLanding = () => {
    const darkMode = localStorage.getItem('theme') || 'light';

    return (
        <div className={`fixed top-0 left-0 flex items-center justify-between p-4 w-full ${darkMode === 'dark' ? 'bg-neutral-800 text-gray-300' : 'bg-white border-[#11111128] text-gray-900 font-semibold border-[1px]'} z-50`}>
            <div className="flex items-center space-x-3">
                <img src="./logo.png" alt="Logo" className="h-9 w-7" /> {/* Replace with your logo */}
                <span className="text-lg font-semibold"></span>
            </div>
            <div>
                <a href="/login" className={`mr-4 ${darkMode === 'dark' ? 'text-gray-200' : 'text-gray-800'} hover:underline`}>
                    Login
                </a>
            </div>
        </div>
    );
};

export default NavbarLanding;
