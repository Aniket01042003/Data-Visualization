import { useState, useEffect } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { Gi3dStairs } from "react-icons/gi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { TbDatabaseOff } from "react-icons/tb";
import { FcStatistics } from "react-icons/fc";
import ChartCard from "./ChartCard";
import SmallChart from "./SmallChart";
import AdminProfile from "./Profile/AdminProfile";
import UserProfileList from "./Profile/UserProfileList";
import DataSetList from "./Dataset/DataSetList";
import ChartData from "./showdata/chartData";
import GraphData from "./showdata/graphData";
import StatisticsData from "./showdata/StatisticsData";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout, fetchDatasets, fetchGraphs } from "../../Redux/Admin/Action";
import FalseData from "./showdata/falseData";

function DashboardPage({filesData}) {
    return <div><SmallChart /><ChartCard filesData={filesData} /></div>;
}

export default function DashBoard() {
    const dispatch = useDispatch();
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [activeItem, setActiveItem] = useState({ type: "Dashboard", data: null });


    useEffect(() => {
        dispatch(fetchGraphs());
        dispatch(fetchDatasets());
    }, [dispatch])

    const graphData = useSelector((store) => store.graphs);
    const graphArray = graphData?.graphs;
    console.log("graphData", graphArray);

    const fiData = useSelector((store) => store.datasets);
    const filesData = fiData.datasets;
    console.log("filesData", filesData);


    // ✅ Dynamically handle screen resizing
    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth >= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ✅ Toggle sidebar function
    const toggleSidebar = (e) => {
        e.stopPropagation();
        setIsSidebarOpen((prev) => !prev);
    };

    // ✅ Close sidebar when clicking outside
    const closeSidebar = (e) => {
        if (window.innerWidth < 768 && !e.target.closest("#sidebar") && !e.target.closest("#open-sidebar")) {
            setIsSidebarOpen(false);
        }
    };
    const handleLogout = () => {
        console.log("hii")
        dispatch(adminLogout)
        setTimeout(() => {
            window.location.href = "/"; // Ensures full logout
        }, 1000);
    };

    return (
        <div className="bg-gray-100 min-h-screen" onClick={closeSidebar}>
            <div className="h-screen flex overflow-hidden bg-gray-200">

                {/* Sidebar */}
                <div
                    id="sidebar"
                    style={{ backgroundImage: `url('src/assets/sidebar.jpg')` }}
                    className={`bg-cover bg-center text-white w-[20rem]  min-h-screen overflow-y-auto transition-transform duration-300
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                    <div className="p-4 relative z-10">
                        <h1 className="text-2xl font-semibold">Sidebar</h1>
                        <ul className="mt-6">
                            {[
                                { name: "Dashboard", icon: <AiOutlineAppstore className="h-[2rem] w-[20px]" /> },
                                { name: "Admin Profile", icon: <FaRegUser className="h-[2rem] w-[20px]" /> },
                                { name: "User Profile List", icon: <LiaClipboardListSolid className="h-[2rem] w-[20px]" /> },
                                { name: "Chart List", icon: <IoStatsChart className="h-[2rem] w-[20px]" /> },
                                { name: "Manual Data List", icon: <IoStatsChart className="h-[2rem] w-[20px]" /> },
                                { name: "Graph List", icon: <Gi3dStairs className="h-[2rem] w-[20px]" /> },
                                { name: "False Data", icon: <TbDatabaseOff className="h-[2rem] w-[20px]" /> },
                                { name: "Statistics", icon: <FcStatistics className="h-[2rem] w-[20px]" /> },
                            ].map((item) => (
                                <li
                                    key={item.name}
                                    className={`mb-6 flex p-4 h-[3rem] justify-start items-center gap-2 rounded-md cursor-pointer 
                                        ${activeItem === item.name ? "bg-[#00acc1]" : "hover:bg-gray-700"}`}
                                    onClick={() => setActiveItem(item.name)}
                                >
                                    <div className="h-[2rem] w-[20px]">{item.icon}</div>
                                    <span className="block text-sm">{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className={`flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? "w-[100vw]" : "w-[400rem]"}`}>
                    <div className="bg-white shadow">
                        <div className="container mx-auto">
                            <div className="flex justify-between items-center py-4 px-2">
                                <div className="" ><h1 className="text-xl font-semibold">Welcome To DashBoard</h1></div>
                                <div onClick={handleLogout} >
                                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
                                        Logout
                                    </button>
                                </div>
                                {/* ✅ Correctly handle sidebar toggle button */}
                                <button
                                    className="text-gray-500 hover:text-gray-600 md:hidden"
                                    id="open-sidebar"
                                    onClick={toggleSidebar}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Content Rendering */}
                    <div className="flex-1 bg-[#eeeeee] overflow-auto p-4">
                        {activeItem === "Dashboard" && <DashboardPage filesData={filesData}/>}
                        {activeItem === "Admin Profile" && <AdminProfile handleLogout={handleLogout} />}
                        {activeItem === "User Profile List" && <UserProfileList filesData={filesData} setActiveItem={setActiveItem}/>}
                        {activeItem === "Chart List" && <DataSetList filesData={filesData.filter(file => file.fileURL !== null)} index={0} setActiveItem={setActiveItem} />}
                        {activeItem === "Manual Data List" && <DataSetList filesData={filesData.filter(file => file.fileURL === null)} index={0} setActiveItem={setActiveItem}/>}
                        {activeItem === "Graph List" && <DataSetList filesData={graphArray} index={1} setActiveItem={setActiveItem} />}
                        {activeItem === "False Data" && <FalseData/>}
                        {activeItem === "Statistics" && <StatisticsData filesData={filesData}/>}
                        {activeItem.type === "ChartData" && <ChartData data={activeItem.data} />}
                        {activeItem.type === "GraphData" && <GraphData data={activeItem.data} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
