import React from 'react'
import './Card.css'
import { assets } from '../../../assets/assets'

const Card = () => {
  return (
    <div className="card">
        <img src={assets.branch} alt="" />
        <div className="description"><p>Johar Town Branch</p></div>
    </div>
  )
}

export default Card