import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./partials/Loader";
import ScrollTop from "./partials/ScrollTop";

const TV = () => {
  const navigate = useNavigate();
  
  const [category, setcategory] = useState("popular");
  const [tvshows, settvshows] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true)
  
  document.title = `CineXplore | Tv Shows ${category}`;

  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        settvshows((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    if (tvshows.length === 0) {
        getTvShows();
    } else {
      setpage(1);
      settvshows([]);
      getTvShows();
    }
  };

  useEffect(() => {
    refreshHandler()
  }, [category]);

  return tvshows.length > 0 ? (
    <div className="w-screen min-h-screen bg-[#000000]">
      <div className="w-full px-[8%] py-3 flex items-center">
        <h1 className="text-2xl font-semibold text-[#F5C518] flex w-full">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-2xl hover:text-[#F5C518] mr-2 cursor-pointer text-white"
          ></i>
          <span className="hidden md:block">Tv Shows</span>
        </h1>
        <Topnav style={"hidden"}/>
        <Dropdown
          title="Filter"
          options={["airing_today","top_rated","on_the_air","popular"]}
          styleDt=""
          func={(e) => setcategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={tvshows.length}
        next={getTvShows}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tvshows} title={"tv"}/>
      </InfiniteScroll>
      <ScrollTop/>
    </div>
  ) : (
    <Loader/>
  );
};

export default TV;
