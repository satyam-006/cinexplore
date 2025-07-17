import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  asyncLoadperson,
  removePerosnDetail,
} from "../../store/actions/personActions";

import img_not_found from "../../assets/img_not_found.jpg";
import maleIcon from "../../assets/male_icon.jpg";
import femaleIcon from "../../assets/female_icon.jpg";

import HorizontalCards from "./HorizontalCards";
import Loader from "./Loader";
import Footer from "./Footer";
import Dropdown from "./Dropdown";

const PersonDetails = () => {
  const getMonth = (month) => {
    // This function converts the month number to its corresponding string representation.
    switch (Number(month)) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        return "";
    }
  };

  const [category, setcategory] = useState("movie");

  const [showOverview, setshowOverview] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  document.title = `${
    info ? info?.detail?.name + " - CineXplore" : "CineXplore"
  }`;

  useEffect(() => {
    dispatch(asyncLoadperson(id));
    return () => {
      dispatch(removePerosnDetail());
    };
  }, [id]);

  return info ? (
    <div className="w-screen">
      <div className="w-screen px-[6%] overflow-x-hidden relative">
        <nav className="w-full flex items-center justify-between py-6">
          <div className="flex items-center gap-5">
            <i
              onClick={() => navigate(-1)}
              className="ri-arrow-left-line text-2xl hover:text-[#F5C518] mr-2 cursor-pointer text-white"
            ></i>
          </div>
          <div>
            <h1>
              <span className="text-xl md:text-2xl text-white font-semibold">
                CineXplore
              </span>
            </h1>
          </div>
        </nav>
        <div className="w-full h-full flex flex-col md:flex-row mt-5">
          <div className="md:w-[30%]">
            <div
              className="md:w-[92%] h-[40vh] md:h-[30vh] lg:h-[60vh] shadow-xl"
              style={{
                background: `${
                  info.detail.profile_path
                    ? `url(https://image.tmdb.org/t/p/original/${info.detail.profile_path})`
                    : info.detail.gender === 2
                    ? `url(${maleIcon})`
                    : info.detail.gender === 1
                    ? `url(${femaleIcon})`
                    : `url(${img_not_found})`
                }`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "10px",
              }}
            ></div>
            <hr className="md:w-[92%] h-[2px] bg-zinc-400 mt-8" />
            <ul className="flex items-center gap-10 md:gap-4 mt-3 md:mt-5">
              <a
                href={`https://www.facebook.com/${info.externalId.facebook_id}/`}
                target="_blank"
              >
                <i className="ri-facebook-circle-fill text-zinc-300 text-2xl md:text-3xl"></i>
              </a>
              <a
                href={`https://www.instagram.com/${info.externalId.instagram_id}/`}
                target="_blank"
              >
                <i className="ri-instagram-line text-zinc-300 text-2xl md:text-3xl"></i>
              </a>
              <a
                href={`https://x.com/${info.externalId.twitter_id}/`}
                target="_blank"
              >
                <i className="ri-twitter-x-line text-zinc-300 text-2xl md:text-3xl"></i>
              </a>
              <a
                href={`https://www.tiktok.com/${info.externalId.tiktok_id}/`}
                target="_blank"
              >
                <i className="ri-tiktok-fill text-zinc-300 text-2xl md:text-3xl"></i>
              </a>
            </ul>
            <h2 className="text-xl md:text-2xl text-zinc-400 font-bold md:font-semibold mt-3 md:mt-5">
              Personal Info
            </h2>
            <div className="mt-2">
              <h3 className="md:text-lg text-zinc-400 font-bold md:font-semibold">Known For</h3>
              <h4 className="text-md text-zinc-400">
                {info.detail.known_for_department}
              </h4>
            </div>
            <div className="mt-3 md:mt-5">
              <h3 className="md:text-lg text-zinc-400 font-bold md:font-semibold">
                Known Credits
              </h3>
              <h4 className="text-md text-zinc-400">
                {info.combinedCredits.cast.length}
              </h4>
            </div>
            <div className="mt-3 md:mt-5">
              <h3 className="md:text-lg text-zinc-400 font-bold md:font-semibold">Gender</h3>
              <h4 className="text-md text-zinc-400">
                {info.detail.gender === 2
                  ? "Male"
                  : info.detail.gender === 1
                  ? "Female"
                  : "Unknown"}
              </h4>
            </div>
            <div className="mt-3 md:mt-5">
              <h3 className="md:text-lg text-zinc-400 font-bold md:font-semibold">Birthday</h3>
              <h4 className="text-md text-zinc-400">
                {info.detail.birthday
                  ? `${getMonth(
                      new Date(info.detail.birthday).getMonth() + 1
                    )} ${new Date(info.detail.birthday).getDate()}, ${new Date(
                      info.detail.birthday
                    ).getFullYear()} (${
                      new Date().getFullYear() -
                      1 -
                      new Date(info.detail.birthday).getFullYear()
                    } years old)`
                  : "No Information"}
              </h4>
            </div>
            <div className="mt-3 md:mt-5">
              <h3 className="md:text-lg text-zinc-400 font-bold md:font-semibold">
                Place of Birth
              </h3>
              <h4 className="text-md text-zinc-400">
                {info.detail.place_of_birth}
              </h4>
            </div>
          </div>
          <hr className="md:w-[92%] h-[2px] bg-zinc-400 mt-8 md:hidden" />
          <div className="md:w-[70%] md:px-5 mt-4 md:mt-0">
            <h1
              className="text-2xl md:text-4xl font-['Helvetica'] capitalize font-bold text-white"
              style={{
                backgroundImage: "linear-gradient(white, gray)",
                color: "transparent",
                backgroundClip: "text",
              }}
            >
              {info.detail.name}
            </h1>
            <div>
              <h2 className="text-white md:text-xl font-semibold mt-5">
                Biography
              </h2>
              <p className="text-zinc-300 mt-2 text-sm md:base">
                {info.detail.biography.length > 0
                  ? showOverview === false
                    ? `${info.detail.biography.slice(0, 500)} ${
                        info.detail.biography.length < 500 ? "" : ". . ."
                      }`
                    : info.detail.biography
                  : "No Information"}
                  <span
                onClick={() => setshowOverview(true)}
                className={`font-semibold relative text-[#F5C518] ${
                  showOverview || info.detail.biography.length < 500
                    ? "hidden"
                    : ""
                }`}
              >
                <span className="hover:text-yellow-500 text-sm md:text-lg cursor-pointer ">
                  Read More{" "}
                  <i className="ri-arrow-drop-right-line text-2xl md:text-3xl"></i>
                </span>
              </span>
              </p>
              <h2 className="text-white md:text-xl font-semibold mt-6">
                Known For
              </h2>
              <HorizontalCards data={info.combinedCredits.cast} />
            </div>
            <div className="md:w-[108%]">
              <div className="w-full flex items-center justify-between mb-5">
                <h1 className="text-zinc-300 text-xl font-semibold">Acting</h1>
                <div className="flex gap-10">
                  <Dropdown
                    title="Known For"
                    options={["tv", "movie"]}
                    func={(e) => setcategory(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full shadow-[0_2px_10px] shadow-zinc-300 rounded mb-5 py-[3%]">
                {info[category + "Credits"]?.cast?.map((c, i) => (
                  <div
                    className={`flex gap-10 mb-3 px-[3%] py-2 ${
                      (i + 1) % 4 === 0 ? "border-b-1 border-white" : ""
                    }`}
                    key={i}
                  >
                    <h5 className="text-zinc-300 font-semibold text-[13px] md:text-[15px] mt-1">
                      {new Date(
                        c.release_date || c.first_air_date
                      ).getFullYear()}
                    </h5>
                    <div>
                      <Link to={`/${category}/details/${c.id}`} className="text-zinc-300 font-semibold text-md md:text-lg cursor-pointer hover:text-yellow-400">
                        {c.name || c.title || c.original_title || original_name}
                      </Link>
                      {c.character ? (
                        <p className="text-zinc-400 font-medium text-sm md:text-md ml-5 md:ml-10">
                          as {c.character}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default PersonDetails;
