import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";
import Loader from "./Loader";
import ScrollTop from "./ScrollTop";

const MovieTypes = () => {
  const navigate = useNavigate();
  const { name, genreId } = useParams();

  const [category, setCategory] = useState("popular");
  const [genreTypes, setGenreTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dcmsmovies, setdcmsMovies] = useState([]);
  const [indianMovies, setindianMovies] = useState([]);
  const getGenreTypeMovies = async () => {
    if (!genreId) {
      console.log("No genreId provided.");
      return;
    }

    setIsLoading(true);

    try {
      let allMovies = [];
      let genreMovies = [];
      for (let page = 1; page <= 50; page++) {
        const { data } = await axios.get(`movie/${category}?page=${page}`);
        if (data.results.length > 0) {
          allMovies = [...allMovies, ...data.results];
        }
      }

      // Filter movies by genreId
      const movieIds = new Set();
      allMovies.forEach((item) => {
        if (
          item.genre_ids.includes(Number(genreId)) &&
          !movieIds.has(item.id)
        ) {
          movieIds.add(item.id);
          genreMovies.push(item);
        }
      });

      setGenreTypes(genreMovies);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDCMSMovies = async (companyId) => {
    let allMovies = [];

    let page = 1;
    try {
      while (allMovies.length < 99) {
        const { data } = await axios.get("/discover/movie", {
          params: {
            with_companies: companyId,
            page,
            language: "en-US",
          },
        });
        allMovies = [...allMovies, ...data.results];
        page++;
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    return allMovies;
  };

  const getCombinedMovies = async () => {
    const marvelCompanyId = 420; // Marvel Studios company ID
    const dcCompanyId = 9993; // DC Films company ID

    const marvelMovies = await getDCMSMovies(marvelCompanyId);
    const dcMovies = await getDCMSMovies(dcCompanyId);

    const combinedMovies = [];
    let i = 0;
    let j = 0;

    // Loop to alternate between Marvel and DC movies
    while (i < marvelMovies.length || j < dcMovies.length) {
      if (i < marvelMovies.length) {
        combinedMovies.push(marvelMovies[i]);
        i++;
      }
      if (j < dcMovies.length) {
        combinedMovies.push(dcMovies[j]);
        j++;
      }
    }

    setdcmsMovies(combinedMovies);
  };

  const getIndianMovies = async () => {
    let allMovies = [];
    let page = 1;
    try {
      while (allMovies.length < 500) {
        const { data } = await axios.get("/discover/movie", {
          params: {
            with_origin_country: "IN",
            page,
            language: "en-US",
          },
        });
        allMovies = [...allMovies, ...data.results];
        page++;
      }
      setindianMovies(allMovies);
    } catch (error) {
      console.error("Error fetching Indian movies:", error);
    }
  };

  useEffect(() => {
    if (genreId) {
      getGenreTypeMovies();
      {
        genreId === "4209993" ? getCombinedMovies() : "";
        genreId === "0091" ? getIndianMovies() : "";
      }
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
          options={["now_playing", "top_rated", "upcoming", "popular"]}
          styleDt={`${
            genreId === "4209993" || genreId === "0091" ? "hidden" : ""
          } mr-5`}
          func={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-wrap">
        <Cards
          data={
            genreId === "4209993"
              ? dcmsmovies
              : genreId === "0091"
              ? indianMovies
              : genreTypes
          }
          title={"movie"}
        />
      </div>
      <ScrollTop/>
    </div>
  );
};

export default MovieTypes;
