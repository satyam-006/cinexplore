import React, { useEffect, useState, useRef } from "react";
import axios from "../../utils/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { IoIosArrowForward } from "react-icons/io";

const Show = ({ link }) => {
  const [popular, setpopular] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`/movie/popular`);
      setpopular(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const getNextMovies = () => {
    if (!popular || popular.length === 0) return [];
    const nextIndex = (activeIndex + 1) % popular.length;
    const nextNextIndex1 = (activeIndex + 2) % popular.length;
    const nextNextIndex2 = (activeIndex + 3) % popular.length;
    return [
      popular[nextIndex],
      popular[nextNextIndex1],
      popular[nextNextIndex2],
    ].filter((movie) => movie);
  };

  return popular && popular.length > 0 ? (
    <div className="w-screen md:h-[60vh] lg:h-[90vh] relative md:mb-[5%] lg:mb-[15%]">
      <Link
        to={link}
        className="w-[94%] flex items-center group justify-between"
      >
        <div className="flex items-center">
          <hr className="w-1 h-6 lg:h-9 bg-[#F5C518] mr-2 md:mr-3 rounded-full " />
          <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-semibold my-8 group-hover:text-zinc-300">
            Popular Movies
          </h2>
          <IoIosArrowForward className="text-white text-2xl lg:text-4xl mt-1 ml-1 md:ml-3 group-hover:text-[#F5C518] group-hover:translate-x-3 duration-300" />
        </div>
        <h3 className="text-zinc-400 hidden text-lg font-semibold md:flex items-center opacity-0 duration-200 group-hover:opacity-100">
          View All
          <IoIosArrowForward className="inline ml-1 text-xl" />
        </h3>
      </Link>
      <div className="flex flex-col md:flex-row">
        <div className="w-[90%] md:w-[65%] relative overflow-hidden">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full md:h-[50vh] lg:h-[85vh]"
          >
            {popular.map((p, i) => (
              <SwiperSlide
                key={i}
                className="w-full h-full flex items-center justify-center"
              >
                <Link
                  to={`/movie/details/${p.id}`}
                  className="h-full flex items-center rounded group hover:opacity-95"
                  style={{
                    background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.4),rgba(0,0,0,0.9)),url(https://image.tmdb.org/t/p/original/${
                      p.poster_path || p.backdrop_path || p.profile_path
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "50% 10%",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="h-[35%] lg:h-[30%] lg:w-[80%] px-5 gap-5 mt-[38%] md:mt-[48%] lg:mt-[40%] flex items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${
                        p.poster_path || p.backdrop_path || p.profile_path
                      }`}
                      alt=""
                      className="w-[20%] md:w-[18%] h-[100%] object-cover object-center rounded-xl md:rounded-2xl"
                    />
                    <i class="ri-play-fill text-white text-xl md:text-3xl px-2 py-1 lg:px-3 lg:py-2.5 rounded-full border-[2px] border-white ml-2 md:ml-5 group-hover:text-[#F5C518] group-hover:border-[#F5C518]"></i>
                    <h1
                      className=" text-xl md:text-2xl lg:text-3xl font-['Helvetica'] capitalize font-bold text-white leading-6.5"
                      style={{
                        backgroundImage: "linear-gradient(white, gray)",
                        color: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {p.name || p.title || p.original_title}
                      <br />
                      <span className=" text-sm md:text-base text-zinc-400 font-normal">
                        Watch the Trailer
                      </span>
                    </h1>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute top-[40%] md:top-[45%] lg:top-[40%] -translate-y-1/2 left-0 right-0 flex justify-between z-20">
            <button
              onClick={handlePrev}
              className="rounded border-[1px] border-white py-0 md:py-1 bg-[#00000041] cursor-pointer"
            >
              <i className="ri-arrow-left-s-line text-2xl md:text-3xl lg:text-4xl text-white hover:text-yellow-400 w-full"></i>
            </button>
            <button
              onClick={handleNext}
              className="rounded border-[1px] border-white py-0 md:py-2 bg-[#00000041] cursor-pointer"
            >
              <i className="ri-arrow-right-s-line text-2xl md:text-3xl lg:text-4xl text-white hover:text-yellow-400 w-full h-full"></i>
            </button>
          </div>
        </div>

        <div className="hidden w-[30%] pl-4 md:flex flex-col gap-4">
          <h2 className="text-[#F5C518] text-xl font-bold">Up next</h2>
          {getNextMovies().map((movie, index) => (
            <div
              key={index}
              className={`h-[26%] lg:h-[24%] w-full rounded-lg overflow-hidden transition-all duration-300
              hover:opacity-75`}
              onClick={() =>
                swiperRef.current?.slideTo(
                  (activeIndex + index + 1) % popular.length
                )
              }
            >
              <div className="w-full h-full relative cursor-pointer bg-[#101010] p-2 flex">
                <img
                  src={`https://image.tmdb.org/t/p/original/${
                    movie.poster_path ||
                    movie.backdrop_path ||
                    movie.profile_path
                  }`}
                  alt=""
                  className="w-[35%] h-full object-cover object-center rounded-2xl"
                />
                <div className="p-4 ml-2">
                  <i class="ri-play-fill text-white text-lg px-1.5 py-1.5 rounded-full border-[1.5px] border-white"></i>
                  <h3 className="text-base font-semibold line-clamp-1 text-white mt-3">
                    {movie.title || movie.name}
                  </h3>
                  <span className="text-sm font-semibold text-zinc-400">
                    Watch the Trailer
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Show;
