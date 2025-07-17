import React from "react";
import { Link } from "react-router-dom";

const UserButton = ({ userStyle, scroll }) => {
  return (
    <Link
      onClick={() => scroll()}
      to={"/user"}
      className={`${userStyle} text-md font-semibold px-4 py-2 bg-[#2C2C2C] rounded-full hover:bg-[#232323] z-100`}
    >
      Sign In
    </Link>
  );
};

export default UserButton;
