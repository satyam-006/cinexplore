// import { Link } from "react-router-dom";

// const Sidenav = ({shownav,navfunc}) => {
//   return (
//     <div className={`absolute md:relative z-101 md:z-0  bg-[#000000] md:bg-none h-screen md:h-[100vh] border-r-2 border-zinc-400 p-4 ${shownav ? "hidden" : "block"} duration-900 md:block`}>
//       <div className="w-full flex items-center justify-end md:hidden">
//         <i className="ri-close-large-line text-white text-xl font-bold"
//         onClick={()=> navfunc()}></i>
//       </div>
//       <h1 className="mt-8 md:mt-0">
//         <i className="ri-tv-fill text-[#F5C518] text-2xl md:text-3xl mr-2"></i>
//         <span className="text-2xl md:text-3xl text-white font-semibold">CineXplore</span>
//       </h1>
//       <nav className="flex flex-col text-zinc-400 text-xl">
//         <h1 className="text-white font-semibold text-xl mb-5 mt-10">
//           New Feeds
//         </h1>
//         <Link
//           to="/trending"
//           className="hover:bg-[#F5C518] hover:text-black duration-300 rounded-lg p-5 font-semibold"
//         >
//           <i className="ri-fire-fill"></i>
//           Trending
//         </Link>
//         <Link
//           to={"/popular"}
//           className="hover:bg-[#F5C518] hover:text-black duration-300 rounded-lg p-5 font-semibold"
//         >
//           <i className="ri-bard-fill mr-1"></i>
//           Popular
//         </Link>
//         <Link
//           to={"/movie"}
//           className="hover:bg-[#F5C518] hover:text-black duration-300 rounded-lg p-5 font-semibold"
//         >
//           <i className="ri-movie-2-line mr-1"></i>
//           Movies
//         </Link>
//         <Link
//           to={"/tv"}
//           className="hover:bg-[#F5C518] hover:text-black duration-300 rounded-lg p-5 font-semibold"
//         >
//           <i className="ri-tv-2-fill mr-1"></i>
//           Tv Shows
//         </Link>
//         <Link
//           to={"/person"}
//           className="hover:bg-[#F5C518] hover:text-black duration-300 rounded-lg p-5 font-semibold mb-31"
//         >
//           <i className="ri-team-fill mr-1"></i>
//           People
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidenav;

import { Link } from "react-router-dom";

const Sidenav = ({ shownav, navfunc }) => {
  return (
    <div
      className={`
        fixed md:relative top-0 left-0 z-101 md:z-0 
        bg-[#000000] md:bg-transparent 
        h-screen md:h-[100vh] 
        border-r-2 border-zinc-400 
        p-4 
        transform transition-transform duration-500 ease-in-out
        ${shownav ? "-translate-x-full md:translate-x-0" : "translate-x-0"}
        md:translate-x-0
      `}
    >
      <div className="w-full flex items-center justify-end md:hidden">
        <i
          className="ri-close-large-line text-white text-xl font-bold cursor-pointer"
          onClick={() => navfunc()}
        ></i>
      </div>

      <h1 className="mt-8 md:mt-0">
        <i className="ri-tv-fill text-[#F5C518] text-2xl md:text-3xl mr-2"></i>
        <span className="text-2xl md:text-3xl text-white font-semibold">
          CineXplore
        </span>
      </h1>

      <nav className="flex flex-col text-zinc-400 text-xl">
        <h1 className="text-white font-semibold text-xl mb-5 mt-10">
          New Feeds
        </h1>
        <Link
          to="/trending"
          className="hover:bg-[#F5C518] hover:text-black duration-300 rounded-lg p-5 font-semibold"
        >
          <i className="ri-fire-fill mr-1"></i>
          Trending
        </Link>
        <Link
          to="/popular"
          className="hover:bg-[#F5C518] hover:text-black duration-300 rounded-lg p-5 font-semibold"
        >
          <i className="ri-bard-fill mr-1"></i>
          Popular
        </Link>
        <Link
          to="/movie"
          className="hover:bg-[#F5C518] hover:text-black duration-300 rounded-lg p-5 font-semibold"
        >
          <i className="ri-movie-2-line mr-1"></i>
          Movies
        </Link>
        <Link
          to="/tv"
          className="hover:bg-[#F5C518] hover:text-black duration-300 rounded-lg p-5 font-semibold"
        >
          <i className="ri-tv-2-fill mr-1"></i>
          TV Shows
        </Link>
        <Link
          to="/person"
          className="hover:bg-[#F5C518] hover:text-black duration-300 rounded-lg p-5 font-semibold"
        >
          <i className="ri-team-fill mr-1"></i>
          People
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
