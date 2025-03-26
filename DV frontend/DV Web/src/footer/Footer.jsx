import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="bg-gray-800 py-4 text-gray-400">
                <div className="container px-4 mx-auto">
                    <div className="-mx-4 flex flex-wrap justify-between">
                        <div className="px-4 my-4 w-full xl:w-1/5">
                            <a href="/" className="block w-56 mb-10">
                                <svg
                                    version="1.1"
                                    viewBox="0 0 3368 512"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g fill="none" fillRule="evenodd">
                                        <g transform="translate(0 -75)">
                                            <g transform="translate(0 75)">
                                                <rect width="512" height="512" rx="128" fill="#3D5AFE"></rect>
                                                <rect x="149" y="176" width="220" height="220" fill="#fff"></rect>
                                                <circle cx="259" cy="156" r="40" fill="#fff"></circle>
                                                <circle cx="369" cy="286" r="40" fill="#2962FF"></circle>
                                            </g>
                                            <text
                                                fill="white"
                                                fontFamily="Nunito-Bold, Nunito"
                                                fontSize="512"
                                                fontWeight="bold"
                                            >
                                                <tspan x="654" y="518">JUST DV</tspan>
                                            </text>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                            <p className="text-justify">
                            "This data visualization system transforms complex datasets into interactive and insightful visual representations. It enables users to seamlessly upload, process, and analyze large volumes of data, providing clear and meaningful insights through dynamic graphs. Designed for efficiency and scalability, it helps in making data-driven decisions with ease                            </p>
                        </div>
                        <div className="px-4 my-4 w-full sm:w-auto">
                            <h2 className="text-2xl pb-4 mb-4 border-b-4 border-blue-600">Company</h2>
                            <ul className="leading-8">
                                {['About Us', 'Terms & Conditions', 'Privacy Policy', 'Contact Us'].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="hover:text-blue-400">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="px-4 my-4 w-full sm:w-auto">
                            <h2 className="text-2xl pb-4 mb-4 border-b-4 border-blue-600">Blog</h2>
                            <ul className="leading-8">
                                {['Getting Started With DV', 'What Is DV And When to Use It?', 'How Charts and Graphs Can Help Your Productivity?', '5 Tips to Make Responsive', 'See More'].map((item, index) => (
                                    <li key={index}>
                                        <a href="#" className="hover:text-blue-400">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
                            <h2 className="text-2xl pb-4 mb-4 border-b-4 border-blue-600">Connect With Us</h2>
                            <div className="flex space-x-2">
                                {["facebook", "twitter", "instagram", "github"].map((platform, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full hover:text-blue-400 hover:border-blue-400"
                                    >
                                        <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            {/* Placeholder SVG */}
                                            <circle cx="256" cy="256" r="200" fill="currentColor" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
