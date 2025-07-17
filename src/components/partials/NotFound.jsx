import React from 'react'
import { Link } from 'react-router-dom'
import mike from "../../assets/mike_wazowski.jpg"

const NotFound = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col md:flex-row px-8 md:px-0'>
        <div className='w-full md:w-[45%] lg:w-[30%] h-[50%] md:h-[55%] lg:h-[75%]'>
            <img src={mike} alt="" className='w-full h-full object-cover rounded-xl'/>
        </div>
        <div className='w-full md:w-[35%] md:h-[55%] md:p-[5%] md:flex md:flex-col md:justify-center'>
            <h1 className='text-2xl mt-2 md:mt-0 md:text-3xl lg:text-5xl uppercase font-bold text-zinc-100'>oops! page not found.</h1>
            <p className='text-base md:text-lg text-zinc-300 leading-snug mt-5 md:mt-8'>You must have picked the wrong door because I haven't been able to lay my eye on the page you've been searching for.</p>
            <Link to={"/"} className='py-2 px-2 w-[50%] md:w-full inline-flex items-center justify-center rounded-full text-lg bg-[#F5C518] font-bold mt-5 md:mt-10'>Back To Home</Link>
        </div>
    </div>
  )
}

export default NotFound