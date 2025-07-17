import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { asyncLoadtv, removeTVDetail } from "../../store/actions/tvActions";
import img_not_found from "../../assets/img_not_found.jpg";
import imdb from "../../assets/imdb.png";
import HorizontalCards from "../partials/HorizontalCards";
import Loader from "./Loader";
import Footer from "./Footer";

const TvShowDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);

  document.title = `${
    info
      ? (info?.detail?.name ||
          info?.detail?.title ||
          info?.detail?.original_title) + "- CineXplore"
      : "CineXplore"
  }`;

  useEffect(() => {
    dispatch(asyncLoadtv(id));
    return () => {
      dispatch(removeTVDetail());
    };
  }, [id]);

  return info ? (
    <div className="w-screen h-fit">
      <div
        className="px-[6%] overflow-x-hidden relative"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(https://image.tmdb.org/t/p/original/${
            info.detail.backdrop_path || info.detail.profile_path
          })`,
          backgroundSize: "contain",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <nav className="w-full flex items-center justify-between py-6">
          <div className="flex items-center gap-5">
            <i
              onClick={() => navigate(-1)}
              className="ri-arrow-left-line text-2xl hover:text-[#F5C518] mr-2 cursor-pointer text-white"
            ></i>
            <a href={`${info.detail.homepage}`} target="_blank">
              <i className="ri-external-link-line text-xl text-white hover:text-[#F5C518]"></i>
            </a>
            <a
              href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
              target="_blank"
            >
              <img
                src={imdb}
                alt=""
                className="h-6 md:h-8 w-8 object-cover object-center hover:scale-[1.2]"
              />
            </a>
          </div>
          <div>
            <h1>
              <span className="text-xl md:text-2xl text-white font-semibold">
                CineXplore
              </span>
            </h1>
          </div>
        </nav>
        <div className="w-full flex flex-col md:flex-row md:mt-5">
          <div className="w-full md:w-[40%] relative">
            <div
              className="md:w-[95%] lg:w-[90%] h-[40vh] md:h-[45vh] lg:h-[80vh] shadow-xl"
              style={{
                background: `${
                  info.detail.poster_path || info.detail.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original/${
                        info.detail.profile_path || info.detail.backdrop_path
                      })`
                    : `url(${img_not_found})`
                }`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "5px",
              }}
            ></div>
            <Link
              to={`/tv/details/${id}/trailer`}
              className="w-12 h-12 bg-[#F5C518] flex items-center justify-center absolute bottom-[40%] right-[40%] md:bottom-[20%] md:-right-2 lg:right-5 rounded-full 
          hover:w-32 transition-all duration-600 ease-in-out group overflow-hidden"
            >
              <div className="flex items-center gap-2 relative">
                <i className="ri-play-large-fill text-xl md:text-2xl text-black absolute left-1/2 -translate-x-1/2 group-hover:left-0 group-hover:translate-x-0 transition-all duration-600"></i>
                <span className="text-black text-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-600 pl-10">
                  Play
                </span>
              </div>
            </Link>
          </div>
          <div className="md:w-[60%] py-[4%] px-[6%] lg:px-[4%]">
            <div>
              <h1
                className="text-2xl md:text-4xl font-['Helvetica'] capitalize font-bold text-white"
                style={{
                  backgroundImage: "linear-gradient(white, gray)",
                  color: "transparent",
                  backgroundClip: "text",
                }}
              >
                {info.detail.name ||
                  info.detail.title ||
                  info.detail.original_title}
              </h1>
              <h4 className="text-zinc-400 text-base md:text-md mt-2 font-semibold flex items-center gap-3 flex-wrap">
                <span>
                  {new Date(info.detail.first_air_date).getFullYear()}
                </span>
                |
                <span>
                  {" "}
                  {`${
                    info.detail.episode_run_time[0] > 0
                      ? Math.floor(info.detail.episode_run_time[0] / 60)
                      : 0
                  }h ${
                    info.detail.episode_run_time[0] > 0
                      ? info.detail.episode_run_time[0] % 60
                      : 0
                  }min`}{" "}
                </span>
                |
                <span>
                  {info.detail.vote_average !== undefined && (
                    <div className="text-md font-medium text-zinc-400 flex items-center">
                      <i
                        className={`ri-star-fill text-lg md:text-xl mr-1 ${
                          info.detail.vote_average > 0
                            ? "text-[#F5C518]"
                            : "text-gray-500"
                        }`}
                      ></i>
                      {info.detail.vote_average > 0
                        ? info.detail.vote_average.toFixed(1) + " / 10"
                        : ""}
                    </div>
                  )}
                </span>
                |
                {info.detail.genres.map((g, i) => (
                  <span
                    key={i}
                    className="text-md text-zinc-400 font-semibold "
                  >
                    {g.name}
                    {i < info.detail.genres.length - 1 ? " | " : ""}
                  </span>
                ))}
              </h4>
            </div>
            <div>
              <h2 className="text-white md:text-xl font-semibold mt-6 uppercase">
                Overview
              </h2>
              <p className="text-zinc-300 mt-2 text-sm md:base">
                {info.detail.overview.length > 0
                  ? info.detail.overview
                  : "No Information"}
              </p>
            </div>
            <div className="flex items-center gap-15">
              <h2 className="text-zinc-400 text-base md:text-md font-semibold mt-6 flex flex-col items-center">
                Total Episodes
                <span className="text-white text-sm md:text-md">
                  {info.detail.number_of_episodes}
                </span>
              </h2>
              <h2 className="text-zinc-400 text-base md:text-md font-semibold mt-6 flex flex-col items-center">
                Total Seasons
                <span className="text-white text-sm md:text-md">
                  {info.detail.number_of_seasons}
                </span>
              </h2>
            </div>
            <div>
              <h5 className="text-white md:text-xl font-semibold mt-5">
                Available on Platforms
              </h5>
              <div className="w-full mt-6 flex items-center gap-5">
                {info.watchProviders ? (
                  info.watchProviders &&
                  (() => {
                    const allPlatforms = [
                      ...(info.watchProviders.flatrate || []),
                      ...(info.watchProviders.rent || []),
                      ...(info.watchProviders.buy || []),
                    ];

                    const uniquePlatforms = [
                      ...new Map(
                        allPlatforms.map((item) => [item.provider_id, item])
                      ).values(),
                    ];

                    return uniquePlatforms.map((p, i) => (
                      <img
                        key={i}
                        src={`https://image.tmdb.org/t/p/original/${p.logo_path}`}
                        alt=""
                        className="w-15 object-cover object-center rounded shadow-md"
                        title={`${p.provider_name}`}
                      />
                    ));
                  })()
                ) : (
                  <span className="text-zinc-400 text-lg font-semibold">
                    No Information
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className="bg-zinc-400 w-full h-[2px] mt-8 md:mt-15" />
        <div className={`w-screen relative mb-[2%]`}>
          <h2 className="text-white text-xl md:text-2xl font-semibold my-8">
            Seasons
          </h2>
          <HorizontalCards
            data={info.detail.seasons.length > 0 ? info.detail.seasons : ""}
            mediaType={info.detail.media_type || "tv"}
          />
        </div>
        <div className={`w-screen relative mb-[4%]`}>
          <h2 className="text-white text-xl md:text-2xl font-semibold my-8">
            Recommendations & Similar Stuffs
          </h2>
          <HorizontalCards
            data={
              info.recommendations.length > 0
                ? info.recommendations
                : info.similar
            }
            mediaType={info.detail.media_type || "tv"}
          />
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default TvShowDetails;
