import { Link } from "react-router-dom";
import img_not_found from "../../assets/img_not_found.jpg";
const HorizontalCards = ({ data, cardStyle, mediaType }) => {
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

  return (
    <div
      className={`w-[100%] h-[32vh] md:h-[45vh] ${cardStyle} flex items-center gap-5 lg:gap-8 overflow-x-auto mb-0 md:mb-8`}
    >
      {data.map((d, i) => (
        <div
          key={i}
          className="bg-[#1a1a1a] rounded-b-xl rounded-tr-xl shrink-0 h-[30vh] md:h-[35vh] lg:h-[40vh] relative w-[140px] md:w-[18vw] lg:w-[15vw]"
          
        >
          <Link
            to={
              d.media_type
                ? `/${d.media_type}/details/${d.id}`
                : `/${mediaType}/details/${d.id}`
            }
            className="z-50"
          >
            <img
              src={
                d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${d.poster_path}`
                  : img_not_found
              }
              className={`h-[20vh] md:h-[25vh] w-full rounded-tr-xl`}
            />
          </Link>
          <h2 className="text-white ml-2 mt-1 line-clamp-2 text-sm md:text-base font-semibold">
            {d.name || d.title || d.original_title || original_name}
          </h2>
          <h2 className="text-zinc-400 ml-2 mt-1 line-clamp-2 text-sm font-semibold">
            {d.release_date || d.first_air_date || d.air_date
              ? `${getMonth(
                  new Date(
                    d.release_date || d.first_air_date || d.air_date
                  ).getMonth() + 1
                )} ${new Date(
                  d.release_date || d.first_air_date || d.air_date
                ).getDate()}, ${new Date(
                  d.release_date || d.first_air_date || d.air_date
                ).getFullYear()}`
              : "No Information"}
          </h2>
          <Link className="absolute -top-[3.5px] -left-[9px]">
            <i class="ri-bookmark-fill text-5xl text-[rgba(0,0,0,0.3)] hover:text-gray-500 flex items-center justify-center">
              <i class="ri-add-line text-xl text-white relative -left-[35px] -top-1"></i>
            </i>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HorizontalCards;

// import { Link } from "react-router-dom";
// import img_not_found from "../../assets/img_not_found.jpg";

// const HorizontalCards = ({ data, cardStyle, mediaType }) => {
//   const getMonth = (month) => {
//     switch (Number(month)) {
//       case 1:
//         return "Jan";
//       case 2:
//         return "Feb";
//       case 3:
//         return "Mar";
//       case 4:
//         return "Apr";
//       case 5:
//         return "May";
//       case 6:
//         return "Jun";
//       case 7:
//         return "Jul";
//       case 8:
//         return "Aug";
//       case 9:
//         return "Sep";
//       case 10:
//         return "Oct";
//       case 11:
//         return "Nov";
//       case 12:
//         return "Dec";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div
//       className={`w-full h-[40vh] md:h-[50vh] ${cardStyle} flex items-center gap-4 sm:gap-6 md:gap-10 overflow-x-auto scroll-smooth px-2 sm:px-4 mb-8`}
//     >
//       {data.map((d, i) => (
//         <div
//           key={i}
//           className="bg-[#1a1a1a] rounded-b-xl rounded-tr-xl shrink-0 relative flex flex-col justify-between"
//           style={{
//             // width: "40vw",
//             // minWidth: "40vw",
//             // height: "100%", // Ensure equal height
//           }}
//         >
//           <Link
//             to={
//               d.media_type
//                 ? `/${d.media_type}/details/${d.id}`
//                 : `/${mediaType}/details/${d.id}`
//             }
//             className="z-50"
//           >
//             <img
//               src={
//                 d.poster_path
//                   ? `https://image.tmdb.org/t/p/original/${d.poster_path}`
//                   : img_not_found
//               }
//               className="h-[24vh] md:h-[32vh] w-full object-cover rounded-tr-xl"
//               alt={d.title || d.name}
//             />
//           </Link>

//           <div className="p-2">
//             <h2 className="text-white text-sm font-semibold min-h-[3rem]">
//               {d.name || d.title || d.original_title || d.original_name}
//             </h2>
//             <h2 className="text-zinc-400 line-clamp-1 text-sm font-semibold min-h-[1.5rem]">
//               {d.release_date || d.first_air_date || d.air_date
//                 ? `${getMonth(
//                     new Date(
//                       d.release_date || d.first_air_date || d.air_date
//                     ).getMonth() + 1
//                   )} ${new Date(
//                     d.release_date || d.first_air_date || d.air_date
//                   ).getDate()}, ${new Date(
//                     d.release_date || d.first_air_date || d.air_date
//                   ).getFullYear()}`
//                 : "No Information"}
//             </h2>
//           </div>

//           <Link className="absolute -top-[3.5px] -left-[9px]">
//             <i className="ri-bookmark-fill text-5xl text-[rgba(0,0,0,0.3)] hover:text-gray-500 flex items-center justify-center">
//               <i className="ri-add-line text-xl text-white relative -left-[35px] -top-1"></i>
//             </i>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HorizontalCards;
