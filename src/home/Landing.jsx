// Landing.js
import NavbarLanding from './components/NavbarLanding';
import ImageCarousel from './components/ImageCarousel';
import { useState } from 'react';

const techStack = [
    { name: 'Expo', logo: 'https://raw.githubusercontent.com/expo/expo/main/.github/resources/banner.png' },
    { name: 'Vite', logo: 'https://skillicons.dev/icons?i=vite' },
    { name: 'React', logo: 'https://skillicons.dev/icons?i=react' },
    { name: 'Tailwind', logo: 'https://skillicons.dev/icons?i=tailwind' },
    { name: 'Express', logo: 'https://skillicons.dev/icons?i=express' },
    { name: 'Elysia', logo: 'https://skillicons.dev/icons?i=elysia' },
    { name: 'Actix', logo: 'https://skillicons.dev/icons?i=actix' },
    { name: 'Flask', logo: 'https://skillicons.dev/icons?i=flask' },
    { name: 'Tensorflow', logo: 'https://skillicons.dev/icons?i=tensorflow' },
    { name: 'Node', logo: 'https://skillicons.dev/icons?i=nodejs' },
    { name: 'Bun', logo: 'https://skillicons.dev/icons?i=bun' },
    { name: 'Supabase', logo: 'https://skillicons.dev/icons?i=supabase' },
    { name: 'Prisma', logo: 'https://skillicons.dev/icons?i=prisma' },
    { name: 'Linux', logo: 'https://skillicons.dev/icons?i=linux' },
    { name: 'Typescript', logo: 'https://skillicons.dev/icons?i=typescript' },
    { name: 'Rust', logo: 'https://skillicons.dev/icons?i=rust' },

    // Add more as needed
  ];

const Landing = () => {
    const darkMode = localStorage.getItem('theme') || 'light';


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className={`p-0 flex flex-col min-h-screen ${darkMode === 'dark' ? 'bg-neutral-900 text-gray-300' : 'bg-[#f8f8f8] rounded-md border-[#11111128] font-semibold border-[1px]'}`}>
            <NavbarLanding />

            <main className={`p-3 pt-[142px] flex-1 w-full`}> {/* Adjusted pt-20 for more space */}

            <div className='flex flex-col justify-center items-center'>
                <h1 className="text-[6rem] font-bold mb-1">
                            Alobro                    
                </h1>

                <h4  className="text-[4.75rem] text-[#353434] font-bold mb-8">
                    Your Type Safe Social Media
                </h4>
                
                <div className='max-w-[50vw]'>
                    <p className="text-[1.275rem] mb-10 text-gray-700 text-center">
                            Dedicated to user comfort and safety, featuring advanced AI filters. 
                            All uploaded content undergoes strict screening to maintain a positive and productive environment.
                    </p>
                </div>

                <div className="flex items-center space-x-4 mb-5">
                    <p className="text-[#111111] text-[1.275rem]">Join with us !</p>

                    <a 
                        href="/register" 
                        className={`px-6 py-3 rounded-lg ${darkMode === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-[#e7e7e7]'} font-semibold shadow-md hover:bg-gray-500 transition duration-200`}
                    >
                        Create Your First Account
                    </a>


                </div>

            </div>

            <div className='grid grid-cols-10 w-full px-[8rem] '>
                <section className="col-span-5 text-left pl-[4rem] py-12">

                    <p className="mb-3 text-[#111111] text-[1.275rem]">As Social Media Alternatives</p>
                    
                    <h1 className="text-[2.75rem] font-bold mb-2 text-[#1f1f1ff6]">
                        Platform for Everyone                    
                    </h1>

                    <p  className="space-y-4 mb-6 text-[#2e2d2dd2] text-[1.275rem]">
                        Aims to create a safe and supportive social media environment where users can freely connect and express themselves without fear of harmful content. 
                    </p>

                    <p  className="space-y-4 mb-8 text-[#2e2d2dd2] text-[1.275rem]">
                        Leveraging advanced AI filtering, we are committed to fostering a positive, engaging, and respectful community for everyone.
                    </p>
                    
                    <a href="https://drive.google.com/file/d/1Jn4R4qG3GC8tta96rQmjvSCRu7eIYAFh/view?usp=drive_link" className={`px-6 py-3 rounded-lg ${darkMode === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-800 text-[#e7e7e7]'} font-semibold shadow-md hover:bg-gray-500 transition duration-200`}
                    >
                        Download App (.apk)
                    </a>
                </section>

                <section className="w-full col-span-5 mt-10 text-left pl-[4rem]">
                    {/* <h2 className="text-3xl font-bold mb-6">Our Products</h2> */}
                    <ImageCarousel/>
                </section>

            </div>

            <div className='px-[12rem]'>

                <section className="pt-[2rem] block col-span-5 mt-10 text-left border-t-[#1b1b1bbb] border-t-[1px]"> {/* Right section takes 2 parts */}

                <div className='max-w-[50vw] mx-auto'>
                        <h2 className="text-4xl text-neutral-800 font-bold text-center mb-10">Why Choose Us?</h2>
                        
                        <ul className="space-y-6 mb-6">
                            <li className="flex items-start">
                                <span className="mr-2">🛡️</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Content Safety</span> — Our top priority is creating a secure space where users feel protected and free to express themselves.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🌱</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Positive Community</span> — We cultivate a friendly and respectful environment that fosters meaningful connections.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🚫</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Anti-Bullying & Anti-Pornography</span> — Strict policies and filtering ensure a space free from harmful content and harassment.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🤖</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Advanced AI Filtering</span> — Utilizing AI to automatically screen content, keeping interactions safe and enjoyable.
                                </span>
                            </li>
                        </ul>


                        <h2 className="text-4xl text-neutral-800 font-bold text-center mb-10">Our Mission</h2>
                        <ul className="space-y-6 mb-6">
                            <li className="flex items-start">
                                <span className="mr-2">🌟</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Empowerment</span> — We aim to empower individuals by focusing on informative, high-quality, productive, and creative content to be spread.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🌍</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Global Issues Awareness</span> — We aim to raise awareness about pressing global challenges such as climate change, hunger, conflict, and genocide, fostering a community dedicated to advocating for positive change and supporting those in need.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🔞</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Say No To Vulgarism</span> — Our mission is to eliminate all explicit sexual content and combat the pornography industry and sex trafficking.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🤚🏻</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Protect Kids</span> — Our goal is to safeguard children by raising awareness about inappropriate social media practices, ensuring parental guidance over online content, and preventing exposure to pornography from an early age.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🕊️</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Healthy Interactions</span> — We promote healthy communication and connections among users.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🎉</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Creativity</span> — We encourage creativity and innovation in our community by providing tools and support for creators.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🎲</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Combat Online Gambling</span> — We are committed to preventing the spread of illegal activities by allowing links only from reputable and established websites, ensuring a safe online community.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🗣️</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Normalize Using Kind and Polite Language</span> — We promote a culture of respect and kindness, encouraging users to communicate thoughtfully and courteously, fostering a positive community for all.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">👗</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Being Modest and Casual</span> — We encourage our community to embrace attire that is respectful and comfortable, avoiding clothing that may provoke negativity or inappropriate attention.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">✊🏿</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Stop Racism and Cyberbullying</span> — We strive to create an inclusive online environment by actively combating racism and cyberbullying through education, community support, and strict moderation policies.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">🧠</span>
                                <span className="flex-1 text-[#303030]">
                                    <span className="text-black font-semibold">Addiction and Mental Health</span> — We strive to promote healthy usage of social media by raising awareness about the effects of excessive screen time on mental health and encouraging users to take breaks and engage in real-life interactions.
                                </span>
                            </li>
                        </ul>
                        <div className="flex mt-10 justify-center bg-gray-50">
                                <div className="w-full">
                                    <h2 className="text-4xl font-bold text-center text-neutral-800 mb-12">Powered By</h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-center justify-items-center px-6 max-w-5xl mx-auto">
                                    {techStack.map((tech, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                        <img src={tech.logo} alt={`${tech.name} logo`} className="h-12 w-auto mb-2" />
                                        <p className="text-sm font-medium text-neutral-700">{tech.name}</p>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                        </div>

                        <h2 className="text-4xl text-neutral-800 font-bold text-center mb-10 mt-10">Contribution</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="p-6 border rounded-lg shadow-md text-center flex flex-col">
                                    <span className="text-4xl mb-4">💡</span>
                                    <h3 className="text-lg font-semibold mb-2 h-10 flex items-center justify-center">Suggestions</h3>
                                    <p className="text-[#303030] mb-4 flex-1">
                                        We welcome your ideas and feedback to help us improve our platform. Share your thoughts on features you’d like to see or ways we can enhance user experience.
                                    </p>
                                    <a href="mailto:naufalandya@outlook.com" className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Join Us</a>
                                </div>

                                <div className="p-6 border rounded-lg shadow-md text-center flex flex-col">
                                    <span className="text-4xl mb-4">💖</span>
                                    <h3 className="text-lg font-semibold mb-2 h-10 flex items-center justify-center">Donate</h3>
                                    <p className="text-[#303030] mb-4 flex-1">
                                        Your support is crucial for our development. Any contribution, no matter how small, helps us sustain our mission and improve our services.
                                    </p>
                                    {/* <a href="/donate" className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Make a Donation</a> */}
                                    <button onClick={openModal} className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                                        Make a Donation
                                 </button>
                                </div>

                                <div className="p-6 border rounded-lg shadow-md text-center flex flex-col">
                                    <span className="text-4xl mb-4">🤝</span>
                                    <h3 className="text-lg font-semibold mb-2 h-10 flex items-center justify-center">Be a Collaborator</h3>
                                    <p className="text-[#303030] mb-4 flex-1">
                                        Join our team of passionate individuals dedicated to making a positive impact. We are looking for volunteers and collaborators to help us grow and evolve as a platform.
                                    </p>
                                    <a href="mailto:naufalandya@outlook.com" className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Join Us</a>
                                    </div>
                                {isModalOpen && (
                                <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full relative">
                                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg">
                                            ❌
                                        </button>
                                        <img src="https://ik.imagekit.io/eoeykxtr4/QR.jpg?updatedAt=1730310947503" alt="Donation QR Code" className="rounded-md bg-white w-full h-auto" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </section>
                
                <section className="mt-8 pb-4 text-center">
                    {/* <h2 className="text-2xl font-semibold mb-4">Get Quality Info, Inspiration, and Content</h2> */}

                </section>

            </div>
            </main>

            <footer className="w-full bg-gray-800 text-white py-4">
                            <div className="max-w-7xl mx-auto px-4 text-center">
                                <p className="text-sm">&copy; 2024 Alobro. All rights reserved.</p>
                            </div>
            </footer>
        </div>
    );
};

export default Landing;
