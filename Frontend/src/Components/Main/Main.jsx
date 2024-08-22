import React from 'react'
import './Main.css'
import Card from './Card/card'
import { assets } from '../../assets/assets'
import MediumStats from './MediumStats/MediumStats'

const Main = () => {
  return (
    <div className='main'>
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
        <div className="LinkedBranches">
          <div className="card1"><Card/></div>
          <div className="card2"><Card/></div>
          <div className="card3"><Card/></div>
          <div className="card4"><Card/></div>
        </div>
        <div className="TMStats">
          <div className="Bike"><MediumStats/></div>
          <div className="Drone"><MediumStats/></div>
          <div className="Truck"><MediumStats/></div>
        </div>
    </div>
  )
}

export default Main