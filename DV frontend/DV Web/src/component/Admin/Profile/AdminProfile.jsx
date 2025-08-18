import React from 'react'
import { useSelector } from 'react-redux'

function AdminProfile({handleLogout}) {

  const res = useSelector((store)=>store.adminLogin?.adminInfo?.admin);
  // console.log("admininfo ", res);

  return (
    <div>
      <div className="flex justify-between h-screen shadow-lg gap-[20px] flex-row">
        <div className=' w-[60%] h-70'>
          <div className="flex gap-[20px] bg-white shadow-lg flex-wrap">
            <div style={{ background: 'linear-gradient(60deg, #ab47bc, #8e24aa)' }} class=" w-full shadow-lg h-[4rem] flex items-center j1 grow"><h4 className='ml-12' >Complete Profile</h4></div>

            <div className=" h-[4rem] text-center mt-5 shadow-lg w-full">{res?.role}</div>
            <hr />
            <div className=" h-[4rem] text-center mt-5 shadow-lg w-full grow">{res?.email}</div>
            <hr />
            <div className=" h-[4rem] text-center mt-5 shadow-lg w-full grow">{res?.id}</div>
          </div>
        </div>
        <div className=''>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="relative">
              <img
                className="w-full clippy"
                src='src/assets/admin.png'
                alt="Sunset in the mountains"
              />
            </div>
            <div className="pt-3 pb-5 px-5 flex flex-col items-center">
              <p className="font-bold mb-5 text-3xl">ADMIN</p>
              {/* <p className="text-gray-500 mb-2">{res?.id}</p>
              <p className="text-center mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam facere voluptatum 
              </p> */}
              <button onClick={handleLogout} type="button" class="text-white w-[6rem] bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
