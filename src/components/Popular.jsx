import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./partials/Loader";
import ScrollTop from "./partials/ScrollTop";

const Popular = () => {
  const navigate = useNavigate();
  
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true)
  
  document.title = `CineXplore | Popular ${category}`;

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };


  const refreshHandler = async () => {
    if (popular.length === 0) {
      getPopular();
    } else {
      setpage(1);
      setpopular([]);
      getPopular();
    }
  };

  useEffect(() => {
    refreshHandler()
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen min-h-screen bg-[#000000]">
      <div className="w-full px-[8%] py-3 flex items-center">
        <h1 className="text-2xl font-semibold text-[#F5C518] flex">
        <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-2xl hover:text-[#F5C518] mr-2 cursor-pointer text-white"
          ></i>
          <span className="hidden md:block">Popular</span>
        </h1>
        <Topnav style={"hidden"}/>
        <Dropdown
          title="Category"
          options={["tv", "movie"]}
          styleDt="mr-5"
          func={(e) => setcategory(e.target.value)}
        />
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category}/>
      </InfiniteScroll>
      <ScrollTop/>
    </div>
  ) : (
    <Loader/>
  );
};

export default Popular;
