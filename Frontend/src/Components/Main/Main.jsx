import React from 'react'
import './Main.css'
import Card from './Card/card'
import { assets } from '../../assets/assets'

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
        <div className="TMStats"></div>
    </div>
  )
}

export default Main