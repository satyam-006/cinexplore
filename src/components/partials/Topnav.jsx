import axios from "../../utils/axios";
import React, { useEffect, useState, useRef } from "react";
import { data, Link } from "react-router-dom";
import noimage from "../../assets/noimage.jpeg";

const Topnav = ({ style, navfunc }) => {
  const [query, setQuery] = useState("");
  const [list, setList] = useState(-1);
  const [searches, setSearches] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      getSearches();
    } else {
      setSearches([]);
    }
  }, [query]);

  const handleKeydown = (e) => {
    if (e.key === "ArrowDown") {
      setList((prev) => {
        const newList = Math.min(prev + 1, searches.length - 1);
        scrollToItem(newList);
        return newList;
      });
    } else if (e.key === "ArrowUp") {
      setList((prev) => {
        const newList = Math.max(prev - 1, 0);
        scrollToItem(newList);
        return newList;
      });
    } else if (e.key === "Enter" && list >= 0) {
      const selectedItem = searches[list];
      if (selectedItem) {
        document.getElementById(selectedItem.id).click();
      }
    }
  };

  const scrollToItem = (index) => {
    if (containerRef.current && containerRef.current.children[index]) {
      containerRef.current.children[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [searches, list]);

  return (
    <div className="w-full h-[10vh] flex items-center justify-center relative z-100 px-3 md:px-0">
      <i
        className={`ri-menu-line text-white text-2xl md:hidden ${style}`}
        onClick={() => navfunc()}
      ></i>
      <i
        className={`ri-search-line text-white text-lg md:text-xl absolute left-[23%] md:left-[27%] ${style}`}
      ></i>
      <input
        ref={inputRef}
        type="text"
        className={`w-[70%] md:w-[50%] text-white mx-10 bg-[#2C2C2C] outline-none border-none px-12 py-2 md:py-3 md:text-md rounded-full ${style}`}
        placeholder="Search anything"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      {query.length > 0 && (
        <i
          className="ri-close-line text-white hover:text-[#F5C518] cursor-pointer text-2xl absolute right-[16%] md:right-[27%]"
          onClick={() => setQuery("")}
        ></i>
      )}
      {/* <Link to="/user">
        <i
          className={`ri-user-line text-white text-xl rounded-full border-[1.5px] px-1  md:hidden ${style} py-1`}
        ></i>
      </Link> */}
      <div
        ref={containerRef}
        className="w-[65%] md:w-[50%] max-h-[50vh] md:max-h-[45vh] left-[20%] md:left-[25.5%] absolute top-[95%] overflow-auto bg-zinc-200 rounded overflow-x-hidden overflow-y-auto"
      >
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            id={s.id}
            className={`hover:text-black hover:bg-zinc-300 w-[100%] duration-300 font-semibold text-zinc-600 px-5 py-8 flex justify-start items-center border-b-2 border-zinc-100 ${
              i === list ? "bg-zinc-300" : ""
            }`}
          >
            <img
              className="w-[15vh] md:w-[10vh] h-[12vh] md:h-[12vh] rounded mr-5 shadow-lg object-cover"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            <span>
              {s.name || s.title || s.original_title || s.original_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
