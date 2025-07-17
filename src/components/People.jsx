import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Cards from "./partials/Cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./partials/Loader";
import ScrollTop from "./partials/ScrollTop";

const People = () => {
  document.title = "CineXplore | People";
  const navigate = useNavigate();

  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true)

  const getPeople = async () => {
    try {
      const { data } = await axios.get(`person/popular?page=${page}`);

      if (data.results.length > 0) {
        setpeople((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false)
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refreshHandler = async () => {
    if (people.length === 0) {
        getPeople();
    } else {
      setpage(1);
      setpeople([]);
      getPeople();
    }
  };

  useEffect(() => {
    refreshHandler()
  }, []);

  return people.length > 0 ? (
    <div className="w-screen min-h-screen bg-[#000000]">
      <div className="w-full px-[8%] py-3 flex items-center">
        <h1 className="text-2xl font-semibold text-[#F5C518] flex">
        <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-2xl hover:text-[#F5C518] mr-2 cursor-pointer text-white"
          ></i>
          <span className="hidden md:block">People</span>
        </h1>
        <Topnav style={"hidden md:block"}/>
      </div>
      <InfiniteScroll
        dataLength={people.length}
        next={getPeople}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={people} title={"person"}/>
      </InfiniteScroll>
      <ScrollTop/>
    </div>
  ) : (
    <Loader/>
  );
};

export default People;
