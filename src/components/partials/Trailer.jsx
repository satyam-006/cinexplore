import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

const Trailer = () => {
    const {pathname} = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv"; 
    const {info} = useSelector((state) => state[category])
    const navigate = useNavigate()
    const ytVideo = info?.videos?.key;
    
    if (!ytVideo) {
        return (
            <div className='w-screen h-screen top-0 left-0 absolute z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.8)]'>
                <div className="text-white text-2xl">No trailer available</div>
                <i
                    onClick={() => navigate(-1)}
                    className="ri-close-line text-white text-3xl cursor-pointer absolute top-[2%] right-[2%] hover:text-yellow-400"
                />
            </div>
        )
    }
    
    return (
        <div className='w-screen h-screen top-0 left-0 absolute z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.8)]'>
            <ReactPlayer 
                width={1200}
                height={600}
                playing={true}
                controls={true}
                url={`https://www.youtube.com/watch?v=${ytVideo}`}
            />
            <i
                onClick={() => navigate(-1)}
                className="ri-close-line text-white text-3xl cursor-pointer absolute top-[2%] right-[2%] hover:text-yellow-400"
            />
        </div>
    )
}

export default Trailer