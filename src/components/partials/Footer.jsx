import React from 'react'
import { Link } from 'react-router-dom'
import UserButton from './UserButton'

const Footer = () => {
  return (
    <div className='w-screen h-60 flex flex-col items-center justify-center gap-5'>
        {/* <Link className='text-black bg-[#F5C518] px-8 py-1 text-lg font-semibold rounded-full'>Sign In</Link> */}
        {/* <UserButton userStyle={'text-[#000] bg-[#F5C518] px-8 py-1 hover:bg-yellow-500'}/> */}
        <div className='w-[80%] md:w-[40%] h-28 flex flex-col items-center justify-center gap-3 rounded border-2 border-[#1F1F1F]'>
            <h2 className='text-xl md:text-2xl text-white font-bold'>Follow on social</h2>
            <ul className='flex gap-5 md:gap-10'>
                <li><i class="ri-instagram-line text-2xl text-white px-3 py-3 bg-[#1f1f1f00] hover:bg-[#1f1f1f] duration-200 rounded-full"></i></li>
                <li><i class="ri-twitter-x-line text-2xl text-white px-3 py-3 bg-[#1f1f1f00] hover:bg-[#1f1f1f] duration-200 rounded-full"></i></li>
                <li><i class="ri-youtube-fill text-2xl text-white px-3 py-3 bg-[#1f1f1f00] hover:bg-[#1f1f1f] duration-200 rounded-full"></i></li>
                <li><i class="ri-facebook-box-fill text-2xl text-white px-3 py-3 bg-[#1f1f1f00] hover:bg-[#1f1f1f] duration-200 rounded-full"></i></li>
            </ul>
        </div>
        {/* <ul className='flex gap-5 text-white'>
          <Link>Trending</Link>
          <Link>Popular</Link>
          <Link>Movies</Link>
          <Link>Tv Shows</Link>
          <Link>People</Link>
          <Link>About Us</Link>
        </ul> */}
    </div>
  )
}

export default Footer