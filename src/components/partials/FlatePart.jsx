import React from "react";
import HorizontalCards from "./HorizontalCards";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
function FlatePart({ title, data, mediaType,link }) {
  return (
    <div className={`w-screen relative mb-[4%]`}>
      <Link 
      to={link} 
      className="w-[94%] flex items-center group justify-between">
        <div className="flex items-center">
          <hr className="w-1 h-6 lg:h-9 bg-[#F5C518] mr-2 md:mr-3 rounded-full "/>
          <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold my-8 group-hover:text-zinc-300">{title}</h2>
          <IoIosArrowForward className="text-white text-2xl lg:text-3xl mt-1 ml-1 md:ml-3 group-hover:text-[#F5C518] group-hover:translate-x-3 duration-300"/>
        </div>
        <h3 className="text-zinc-400 hidden text-lg font-semibold md:flex items-center opacity-0 duration-200 group-hover:opacity-100">View All 
          <IoIosArrowForward className="inline ml-1 text-xl"/>
        </h3>
      </Link>
      <HorizontalCards data={data} mediaType={mediaType} />
    </div>
  );
}

export default FlatePart;
