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
            <li><img src={assets.icons8_customer_48} alt="" />{extended?<p>Customer Records</p>:null}</li>
            <li><img src={assets.icons8_drone_48} alt="" />{extended?<p>Drone Catalogue</p>:null}</li>
            <li><img src={assets.icons8_warehouse_48} alt="" />{extended?<p>Warehouses</p>:null}</li>
            <li><img src={assets.icons8_product_48} alt="" />{extended?<p>Products</p>:null}</li>
            <li><img src={assets.icons8_order_48} alt="" />{extended?<p>Order Records</p>:null}</li>
            <li><img src={assets.icons8_delivery_48} alt="" />{extended?<p>Delivery Records</p>:null}</li>
            <li><img src={assets.icons8_clouds_48} alt="" />{extended?<p>Weather Data</p>:null}</li>
            <li><img src={assets.icons8_restricted_48} alt="" />{extended?<p>Restricted Zones</p>:null}</li>
        </div>

        <div className="bottom">
            <li><img src={assets.icons8_logout_48} alt="" />{extended?<p>Logout</p>:null}</li>
        </div>
    </div>
  )
}

export default Sidebar