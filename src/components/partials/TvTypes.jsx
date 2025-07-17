import React, {useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";
import Loader from "./Loader";
import ScrollTop from "./ScrollTop";

const TvTypes = () => {
  const navigate = useNavigate();
  const { name, genreId } = useParams();

  const [category, setCategory] = useState("popular");
  const [genreTypes, setGenreTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGenreTypeTv = async () => {
    if (!genreId) {
      console.log("No genreId provided.");
      return;
    }

    setIsLoading(true);

    try {
      let allTv = [];
      let genreTv = [];
      for (let page = 1; page <= 50; page++) {
        const { data } = await axios.get(`tv/${category}?page=${page}`);
        if (data.results.length > 0) {
          allTv = [...allTv, ...data.results];
        }
      }

      // Filter movies by genreId
      const tvIds = new Set();
      allTv.forEach((item) => {
        if (
          item.genre_ids.includes(Number(genreId)) &&
          !tvIds.has(item.id)
        ) {
          tvIds.add(item.id);
          genreTv.push(item);
        }
      });

      setGenreTypes(genreTv);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (genreId) {
      getGenreTypeTv();
    }
  }, [category, genreId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-screen min-h-screen bg-[#000000]">
      <div className="w-full px-[8%] py-3 flex items-center">
        <h1 className="text-2xl font-semibold text-[#F5C518] flex w-full">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-2xl hover:text-[#F5C518] mr-2 cursor-pointer text-white"
          ></i>
          <span className="hidden md:block">{name}</span>
        </h1>
        <Topnav style={"hidden"}/>
        <Dropdown
          title="Filter"
          options={["airing_today", "on_the_air", "top_rated", "popular"]}
          styleDt="mr-5"
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-wrap">
        <Cards data={genreTypes} title={"tv"} />
      </div>
      <ScrollTop/>
    </div>
  );

};

export default TvTypes;
