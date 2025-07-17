import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
// import UserButton from "./partials/User";
import Loader from "./partials/Loader";
import ScrollTop from "./partials/ScrollTop";

const Trending = () => {
  const navigate = useNavigate();
  
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true)
  document.title = "CineXplore | Trending" + " " + category.toUpperCase();
  
  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    if (trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      settrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    refreshHandler()
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen min-h-screen bg-[#000000]">
      <div className="w-full px-[8%] py-3 flex items-center justify-evenly">
        <h1 className="text-2xl font-semibold text-[#F5C518] flex">
        <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-2xl hover:text-[#F5C518] mr-2 cursor-pointer text-white"
          ></i>
          <span className="hidden md:block">Trending</span>
        </h1>
        <Topnav style={"hidden"}/>
        <Dropdown
          title="Category"
          options={["tv", "movie", "all"]}
          styleDt="mr-5"
          func={(e) => setcategory(e.target.value)}
        />
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => setduration(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} />
      </InfiniteScroll>
      <ScrollTop/>
    </div>
  ) : (
    <Loader/>
  );
};

export default Trending;
