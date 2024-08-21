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

        

        <div className="bottom">
            
        </div>
    </div>
  )
}

export default Sidebar