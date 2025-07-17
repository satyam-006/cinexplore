import React from 'react'
import '../../style/Loader.css'

const Loader = () => {
  return (
    <div className='w-screen h-screen bg-black flex items-center justify-center'>
      <div className="clapperboard">
        <div className="clapper-top">
          <div className="stick"></div>
          <div className="stick"></div>
          <div className="stick"></div>
          <div className="stick"></div>
          <div className="stick"></div>
          <div className="stick"></div>
        </div>
        <div className="clapper-bottom">
          <div className="content">
            <div className="title">SCENE: 01</div>
            <div className="title">TAKE: 01</div>
            <div className="loading-text">LOADING...</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader