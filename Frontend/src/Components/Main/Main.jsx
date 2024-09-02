import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
  return (
    <div className='main'>
      <div className="back">
        <img src={assets.background} alt="" />
      </div>
        <div className="OrderStats">
          <div className="completedorders">
            <div className="heading">Completed Orders :</div>
            <div className="completedpending"><h2>23</h2></div>
          </div>
          <div className="div"><h1>Delivery System</h1></div>
          <div className="pendingorders">
          <div className="heading">Pending Orders :</div>
            <div className="completedpending"><h2>10</h2></div>
          </div>
        </div>
    </div>
      
 
  )
}

export default Main