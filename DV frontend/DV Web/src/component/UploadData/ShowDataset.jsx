import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteDataset, fetchDatasets } from '../../Redux/Dataset/Action';

const ShowDataset = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { datasets, loading, error } = useSelector((store) => store.datasetReducer);
    console.log("datasets ", datasets)
    useEffect(() => {
        dispatch(fetchDatasets());
    }, [dispatch]);
    const handleShowClick = (id) => {
        navigate(`/2dchart/${id}`)
    }
    const handleDeleteClick = (id) => {
        dispatch(deleteDataset(id));
    }
    // if (loading) return <p className="text-center">Loading datasets...</p>;
    // if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className='h-screen'>
            <div className=' flex justify-center shadow-lg items-center'>
                <div className="relative mb-[20px] w-[70rem] overflow-x-auto shadow-lg sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">File name</th>
                                <th scope="col" className="px-6 py-3">Graph</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datasets.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0
                                        ? "bg-white dark:bg-gray-900 hover:border-white"
                                        : "bg-gray-50 dark:bg-gray-800 hover:border-white"
                                        } border-b dark:border-gray-700 border-gray-200 p-5 `}
                                >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.datasetName}
                                    </th>
                                    <td onClick={() => handleShowClick(item._id)} className="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline">show graph</td>
                                    <td onClick={() => handleDeleteClick(item._id)} className="px-6 py-4 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export default ShowDataset

