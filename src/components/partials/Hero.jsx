import { Link } from "react-router-dom";

const Hero = ({ data }) => {
  let rating = Math.ceil((data.vote_average / 5) * 2);

  return (
    <div
      className="h-[90vh] md:h-[51vh] lg:h-[90vh] pt-[3%] pl-[8%] md:pl-[10%] relative"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h4 className="text-base md:text-xl font-semibold px-4 py-1 bg-[#2c2c2c77] w-fit rounded-full border-[1.5px] border-zinc-300 text-zinc-300 mt-10">
        🔥Trending Now
      </h4>
      <h1
        className="text-4xl md:text-5xl font-['Helvetica'] capitalize font-bold text-white mt-10 md:mt-8"
        style={{
          backgroundImage: "linear-gradient(white, gray)",
          color: "transparent",
          backgroundClip: "text",
        }}
      >
        {data.name || data.title || data.original_title || original_name}
      </h1>
      <div className="flex items-center mt-2 md:mt-0">
        <h2 className="text-white">
          {[...Array(5)].map((_, index) => (
            <i
              key={index}
              className={`${
                index < rating
                  ? "ri-star-fill text-yellow-400 text-xl lg:text-2xl"
                  : "ri-star-line text-zinc-300 text-xl lg:text-2xl"
              }`}
            ></i>
          ))}
        </h2>
        <p className="text-white ml-3 md:ml-5">
          <i class="ri-megaphone-fill text-lg md:text-xl text-yellow-400"></i>{" "}
          {data.release_date || data.first_air_date || "No Information"}
          <i class="ri-album-fill text-yellow-400 mx-1 ml-3 md:ml-4 text-lg md:text-xl"></i>
          {data.media_type.toUpperCase()}
        </p>
      </div>

      <p className="w-[80%] lg:w-[50%] text-zinc-300 mt-5">
        {data.overview.slice(0, 250)} ...
        <Link
          to={`${data.media_type}/details/${data.id}`}
          className="text-yellow-400"
        >
          See more
        </Link>
      </p>
      <div className="flex gap-5 mt-10">
        <Link
          to={`/movie/details/${data.id}/trailer`}
          className="text-zinc-300 font-semibold border-[1.5px] border-zinc-400 rounded-md px-6 py-1 shadow-md flex items-center justify-center hover:text-zinc-400"
        >
          Watch trailer
        </Link>
        <Link
          to={`/movie/details/${data.id}/trailer`}
          className="font-semibold border-[1.5px] border-yellow-400 bg-yellow-400 rounded-md px-4 py-2 shadow-md flex items-center justify-center gap-2 hover:bg-yellow-500"
        >
          <i className="ri-play-fill text-xl"></i>
          Watch now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
