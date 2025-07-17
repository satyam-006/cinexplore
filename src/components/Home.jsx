import React, { useEffect, useRef, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Hero from "./partials/Hero";
import Show from "./partials/Show";
import Footer from "./partials/Footer";
import Loader from "./partials/Loader";
import img_not_found from "../assets/img_not_found.jpg";
import maleIcon from "../assets/male_icon.jpg";
import femaleIcon from "../assets/female_icon.jpg";
import { Link} from "react-router-dom";
import FlatePart from "./partials/FlatePart";
import { IoIosArrowForward } from "react-icons/io";
import UserButton from "./partials/UserButton";
import ScrollTop from "./partials/ScrollTop";

const Home = () => {
  document.title = "CineXplore | Home";
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState([]);
  const [trendingTv, settrendingTv] = useState([]);
  const [upcoming, setupcoming] = useState([]);
  const [popularTvShows, setpopularTvShows] = useState([]);
  const [ducumentryShow, setducumentryShow] = useState([]);
  const [popularPeople, setpopularPeople] = useState([]);
  const [poularAnimation, setpoularAnimation] = useState([]);
  const [adventure, setadventure] = useState([]);
  const [scienceFiction, setscienceFiction] = useState([]);
  const [crime, setcrime] = useState([]);
  const [thriller, setthriller] = useState([]);
  const [popularAnime, setpopularAnime] = useState([]);
  const [horror, sethorror] = useState([]);
  const [kids, setkids] = useState([]);
  const [dcmsmovies, setdcmsMovies] = useState([]);
  const [indianMovies, setindianMovies] = useState([]);
  const [shownav, setshownav] = useState(true)

  const handleNav = () =>{
    setshownav(!shownav)
  }

  const getHeroWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/movie/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const getTvShows = async () => {
    try {
      const { data } = await axios.get(`/trending/tv/day`);
      settrendingTv(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const getPopularMoviesBasedOnGenre = async () => {
    try {
      let allMovies = [];
      let animation = [];
      let adventure = [];
      let crime = [];
      let scienceFiction = [];
      let thriller = [];
      let horror = [];
      for (let page = 1; page <= 10; page++) {
        const { data } = await axios.get(`/movie/popular?page=${page}`);
        allMovies = [...allMovies, ...data.results];
      }
      allMovies.map((item) => {
        if (item.genre_ids.includes(16)) {
          animation.push(item);
        }
        if (item.genre_ids.includes(12)) {
          adventure.push(item);
        }
        if (item.genre_ids.includes(878)) {
          scienceFiction.push(item);
        }
        if (item.genre_ids.includes(80)) {
          crime.push(item);
        }
        if (item.genre_ids.includes(53)) {
          thriller.push(item);
        }
        if (item.genre_ids.includes(27)) {
          horror.push(item);
        }
      });
      setthriller(thriller);
      setcrime(crime);
      setscienceFiction(scienceFiction);
      setpoularAnimation(animation);
      setadventure(adventure);
      sethorror(horror);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getPopularTvBasedOnGenre = async () => {
    try {
      let allTv = [];
      let animation = [];
      let ducumentryShow = [];
      let kids = [];
      for (let page = 1; page <= 20; page++) {
        const { data } = await axios.get(`/trending/tv/week?page=${page}`);
        allTv = [...allTv, ...data.results];
      }
      allTv.map((item) => {
        if (item.genre_ids.includes(16)) {
          animation.push(item);
        }
        if (item.genre_ids.includes(99)) {
          ducumentryShow.push(item);
        }
        if (item.genre_ids.includes(10762)) {
          kids.push(item);
        }
      });
      setpopularAnime(animation);
      setducumentryShow(ducumentryShow);
      setkids(kids);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getUpcoming = async () => {
    try {
      const { data } = await axios.get(`/movie/upcoming`);
      setupcoming(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getPopularTvShows = async () => {
    try {
      const { data } = await axios.get(`/tv/popular`);
      setpopularTvShows(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const getPopularPeople = async () => {
    try {
      const { data } = await axios.get(`/trending/person/week`);
      setpopularPeople(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getDCMSMovies = async (companyId) => {
    let allMovies = [];
    let page = 1;
    try {
      while (allMovies.length < 20) {
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
      while (allMovies.length < 30) {
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
    getTrending();
    getTvShows();
    getUpcoming();
    getPopularTvShows();
    getPopularPeople();
    getPopularMoviesBasedOnGenre();
    getPopularTvBasedOnGenre();
    !wallpaper && getHeroWallpaper();
    getCombinedMovies();
    getIndianMovies();
  }, []);

  return wallpaper && trending.length > 0 && upcoming.length > 0 ? (
    <div className={`w-screen relative`}>
      <div className="flex border-b-2 border-zinc-400">
        <Sidenav shownav={shownav} navfunc={handleNav}/>
        <div className="w-full md:h-full relative overflow-x-hidden">
          <Topnav navfunc={handleNav}/>
          <Hero data={wallpaper} />
          {/* <UserButton userStyle={"absolute md:top-7.5 md:right-8 text-white hidden md:block"}/> */}
        </div>
      </div>
      <div className="px-5 md:px-8">
        <FlatePart
          data={trending}
          title={"Trending Movies"}
          mediaType={"movie"}
          link={"/trending"}
        />
        <Show link={"/movie"} />
        <FlatePart
          data={trendingTv}
          title={"Trending TV Shows"}
          mediaType={"tv"}
          link={"/trending"}
        />

        <FlatePart
          data={upcoming}
          title={"Upcoming Movies"}
          mediaType={"movie"}
          link={"/movie"}
        />
        <FlatePart
          data={indianMovies}
          title={"Exclusive Indian Movies"}
          mediaType={"movie"}
          link={"/movie-types/Indian Cinema/0091"}
        />
        <FlatePart
          data={popularTvShows}
          title={"Popular Tv Shows"}
          mediaType={"tv"}
          link={"/tv"}
        />
        <div className="w-screen relative mb-[4%]">
          <Link
            to={"/person"}
            className="w-[94%] flex items-center group justify-between"
          >
            <div className="flex items-center">
              <hr className="w-1 h-6 lg:h-9 bg-[#F5C518] mr-2 md:mr-3 rounded-full" />
              <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold my-8 group-hover:text-zinc-300">
                Popular celebrities
              </h2>
              <IoIosArrowForward className="text-white text-2xl lg:text-4xl mt-1 ml-1 md:ml-3 group-hover:text-[#F5C518] group-hover:translate-x-3 duration-300" />
            </div>
            <h3 className="text-zinc-400 hidden text-lg font-semibold md:flex items-center opacity-0 duration-200 group-hover:opacity-100">
              View All
              <IoIosArrowForward className="inline ml-1 text-xl" />
            </h3>
          </Link>
          <div className="flex gap-5 md:gap-10 overflow-x-auto">
            {popularPeople &&
              popularPeople.map((person, index) => (
                <div className="flex flex-col w-fit" key={index}>
                  <Link
                    to={`/person/details/${person.id}`}
                    className="w-[18vw] h-[18vw] lg:w-[15vw] lg:h-[15vw] rounded-full overflow-hidden "
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/original/${person.profile_path}`
                          : person.gender === 2
                          ? maleIcon
                          : person.gender === 1
                          ? femaleIcon
                          : img_not_found
                      }
                      alt={person.name}
                    />
                  </Link>
                  <h2 className="text-white text-center text-sm md:text-lg font-semibold mt-1 mb-4">
                    {person.name}
                  </h2>
                </div>
              ))}
          </div>
        </div>
        <FlatePart
          data={adventure}
          title={"Popular in Adventure"}
          mediaType={"movie"}
          link={"/movie-types/Adventure/12"}
        />
        <FlatePart
          data={dcmsmovies}
          title={"Team Marvel or Team DC"}
          mediaType={"movie"}
          link={"/movie-types/Marvel & DC Movies/4209993"}
        />
        <FlatePart
          data={ducumentryShow}
          title={"Documentry Shows"}
          mediaType={"tv"}
          link={"/tv-types/Documentry/99"}
        />
        <FlatePart
          data={kids}
          title={"Kids' Corner"}
          mediaType={"tv"}
          link={"/tv-types/Kids' Corner/10762"}
        />
        <FlatePart
          data={scienceFiction}
          title={"Popular in Sci - Fi"}
          mediaType={"movie"}
          link={"/movie-types/Sci - Fi Movies/878"}
        />
        <FlatePart
          data={crime}
          title={"Popular in Crime"}
          mediaType={"movie"}
          link={"/movie-types/Crime/80"}
        />
        <FlatePart
          data={thriller}
          title={"Popular in Thriller"}
          mediaType={"movie"}
          link={"/movie-types/Thriller/53"}
        />
        <FlatePart
          data={horror}
          title={"Popular in Horror"}
          mediaType={"movie"}
          link={"/movie-types/Horror/27"}
        />
        <FlatePart
          data={poularAnimation}
          title={"Popular in Animated Movies"}
          mediaType={"movie"}
          link={"/movie-types/Animated Movies/16"}
        />
        <FlatePart
          data={popularAnime}
          title={"Popular in Anime"}
          mediaType={"tv"}
          link={"/tv-types/Anime/16"}
        />
      </div>
      <ScrollTop/>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Home;

