import React from 'react'
import './Main.css'
import Card from './Card/card'
import { assets } from '../../assets/assets'
import MediumStats from './MediumStats/MediumStats'

const Main = () => {
  return (
    <div className='main'>
      <div className="back">
        <img src={assets.background} alt="" />
      </div>
        <div className="OrderStats">
          <div className="activeorders">
            <p>active orders</p>
            <div className="outp"></div>
          </div>
          <div className="pendingorders">
            <p>pending orders</p>
            <div className="outp"></div>
          </div>
        </div>
      
    </div>
  )
}

export default Main