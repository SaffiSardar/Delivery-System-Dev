import React,{useState} from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {


    const[extended,setExtended] = useState(false)
    

  return (
    <div className='sidebar' onMouseEnter={()=>setExtended(prev=>!prev)} onMouseLeave={()=>setExtended(prev=>!prev)}>

        <div className="top">
            {/* <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" /> */}
            <div className="home">
                <img src={assets.icons8_home_48} alt="" />
                {extended?<p><NavLink to='/' exact className='Nav-link'>Home</NavLink></p>:null}
            </div>
        </div>

        <div className="mid">
            <li><img src={assets.icons8_customer_48} alt="" />{extended?<NavLink to='/customerrecords' exact className='Nav-link'>Customer Records</NavLink>:null}</li>
            <li><img src={assets.icons8_drone_48} alt="" />{extended?<p><NavLink to='/deliveryrecords' exact className='Nav-link'>Delivery Records</NavLink></p>:null}</li>
            <li><img src={assets.icons8_delivery_48} alt="" />{extended?<p><NavLink to='/mediumcatalogue' exact className='Nav-link'>Medium Catalogue</NavLink></p>:null}</li>
            <li><img src={assets.icons8_product_48} alt="" />{extended?<p><NavLink to='/orderrecords' exact className='Nav-link'>Order Records</NavLink></p>:null}</li>
            <li><img src={assets.icons8_order_48} alt="" />{extended?<p><NavLink to='/products' exact className='Nav-link'>Products</NavLink></p>:null}</li>
            <li><img src={assets.icons8_warehouse_48} alt="" />{extended?<p><NavLink to='/warehouses' exact className='Nav-link'>Warehouses</NavLink></p>:null}</li>
            <li><img src={assets.icons8_clouds_48} alt="" />{extended?<p><NavLink to='/weatherdata' exact className='Nav-link'>Weather Data</NavLink></p>:null}</li>
        </div>

        <div className="bottom">
            
            <li><img src={assets.icons8_request_48} alt="" />{extended?<p><NavLink to='/requests' exact className='Nav-link'>Requests</NavLink></p>:null}</li>
            <li><img src={assets.icons8_logout_48} alt="" />{extended?<p>Logout</p>:null}</li>
        </div>
    </div>
  )
}

export default Sidebar