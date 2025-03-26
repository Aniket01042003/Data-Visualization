import React from "react";
import { MdContentCopy } from "react-icons/md";
import { GoInfo } from "react-icons/go";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { MdOutlineAccessibility } from "react-icons/md";

const SmallChart = () => {

  const arr = [
    {
      icon: <MdContentCopy className="h-10 w-10 text-white"/>,
      color: 'linear-gradient(60deg, #ffa726, #fb8c00)'
    }, 
    {
      icon: <SiHomeassistantcommunitystore className="h-10 w-10 text-white"/>,
      color: 'linear-gradient(60deg, #66bb6a, #43a047)'
    },
    {
      icon: <GoInfo className="h-10 w-10 text-white"/>,
      color: 'linear-gradient(60deg, #ef5350, #e53935)'
    },
    {
      icon: <MdOutlineAccessibility className="h-10 w-10 text-white"/>,
      color: 'linear-gradient(60deg, #26c6da, #00acc1)'
    },
  ]

  return (
    <div className="bg-[#eeeee] p-4">
      <div className="flex  flex-wrap justify-between ">
        {/* Service Card 1 */}
        {arr.map((item) => (
          <div className="rounded-xl w-[18rem] bg-white p-6 mt-8 shadow-xl">
            <div style={{ background: item.color }} className=" flex h-[6rem] w-[6rem] rounded-md -translate-y-12 transform items-center justify-center shadow-lg shadow-teal-500/40">
              {item.icon}
            </div>
            <h1 style={{font: '"Roboto", "Helvetica", "Arial", sans-serif'}} className="text-darken mb-3 text-lg font-medium ">
              TREE
            </h1>
            <hr />
            <p className="px-4 text-gray-500">
              Lorem
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmallChart;
