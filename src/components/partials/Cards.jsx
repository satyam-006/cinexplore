import React from "react";
import { Link } from "react-router-dom";
import img_not_found from "../../assets/img_not_found.jpg";
import maleIcon from "../../assets/male_icon.jpg";
import femaleIcon from "../../assets/female_icon.jpg";
const Cards = ({ data, title }) => {
  
  return (
    <div className="flex flex-wrap w-full justify-center gap-[3%] px-[2%]">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          key={i}
          className="w-[20vh] lg:w-[25vh] mt-[2%] relative bg-[#1a1a1a] rounded-xl cursor-pointer"
        >
          <img
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : c.known_for_department
                ? c.gender === 2
                  ? maleIcon
                  : c.gender === 1
                  ? femaleIcon
                  : img_not_found
                : img_not_found
            }
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] h-[30vh] lg:h-[30vh] object-cover rounded-t-xl w-[30vh] cursor-pointer hover:opacity-75 text-white"
            alt={c.name || c.title || c.original_title || original_name}
          />
          {c.vote_average !== undefined && (
            <div className="ml-2 mt-2 text-[16px] font-medium text-zinc-400">
              <i
                className={`ri-star-fill text-[16px] ${
                  c.vote_average > 0 ? "text-[#F5C518]" : "text-gray-500"
                } mr-1`}
              ></i>
              {c.vote_average > 0 ? c.vote_average.toFixed(1) : ""}
            </div>
          )}
          <h1
            className={`text-[16px] text-white mt-1 hover:underline ml-2 font-medium line-clamp-2 ${
              c.vote_average || c.vote_average === 0
                ? "absolute"
                : "relative mb-8 mt-4"
            }`}
          >
            {c.name || c.title || c.original_title || original_name}
          </h1>
          {c.vote_average !== undefined && (
            <>
              <div className="w-full flex items-center justify-center mt-[35%] md:mt-[30%]">
                <Link className="text-[#5799EF] text-[15px] font-semibold mt-3 inline-flex items-center bg-[#2C2C2C] px-5 md:px-5 py-1 rounded-full hover:bg-[#424242]">
                  <i className="ri-add-line font-light text-xl md:text-2xl mr-1"></i>
                  Watchlist
                </Link>
              </div>
              <div className="w-full flex items-center justify-center mb-4">
                <Link
                  to={`/movie/details/${c.id}/trailer`}
                  className="text-white text-[15px] font-semibold mt-2 inline-flex items-center px-6 py-1 rounded-full hover:bg-[#2C2C2C]"
                >
                  <i className="ri-play-fill text-xl mr-1"></i>Trailer
                </Link>
              </div>
            </>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
