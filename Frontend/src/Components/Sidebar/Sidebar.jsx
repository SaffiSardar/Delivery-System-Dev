import React,{useState} from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'

const Sidebar = () => {


    const[extended,setExtended] = useState(false)
    

  return (
    <div className='sidebar'>

        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
            <div className="home">
                <img src={assets.icons8_home_48} alt="" />
                {extended?<p>HOME</p>:null}
            </div>
        </div>

        <div className="mid">
            <li><img src={assets.} alt="" />Customer Records</li>
            <li><img src={assets.} alt="" />Drone Catalogue</li>
            <li><img src={assets.} alt="" />Warehouses</li>
            <li><img src={assets.} alt="" />Products</li>
            <li><img src={assets.} alt="" />Order Records</li>
            <li><img src={assets.} alt="" />Delivery Records</li>
            <li><img src={assets.} alt="" />Flight Records</li>
            <li><img src={assets.} alt="" />Weather Data</li>
            <li><img src={assets.} alt="" />Restricted Zones</li>
        </div>

        <div className="bottom">
            <li>Logout</li>
        </div>
    </div>
  )
}

export default Sidebar