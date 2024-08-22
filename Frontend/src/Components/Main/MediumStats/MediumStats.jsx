import React from 'react'
import './MediumStats.css'
const MediumStats = () => {
  return (  
    <div className='Statbox'>
        <div className="type">
            <p className="heading">Type</p>
            <p className="output"></p>
        </div>
        <p className="active">
            <p className="heading">Active</p>
            <p className="output"></p>
        </p>
        <div className="busy">
            <p className="heading">Busy</p>
            <p className="output"></p>
        </div>
        <div className="total">
            <p className="heading">Total</p>
            <p className="output"></p>
        </div>
    </div>
  )
}

export default MediumStats