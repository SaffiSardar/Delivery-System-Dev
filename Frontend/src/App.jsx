import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Main from './Components/Main/Main'
import CustomerRecords from './pages/CustomerRecords'
import DeliveryRecords from './pages/DeliveryRecords'
import MediumCatalogue from './pages/MediumCatalogue'
import OrderRecords from './pages/OrderRecords'
import Products from './pages/Products'
import Warehouses from './pages/Warehouses'
import WeatherData from './pages/WeatherData'
import Sidebar from './Components/Sidebar/Sidebar'
import Requests from './pages/Requests'

const App = () => {
  return (
    <>

      <Sidebar/>

      <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/customerrecords' element={<CustomerRecords/>}/>
          <Route path='/deliveryrecords' element={<DeliveryRecords/>}/>
          <Route path='/mediumcatalogue' element={<MediumCatalogue/>}/>
          <Route path='/orderrecords' element={<OrderRecords/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/warehouses' element={<Warehouses/>}/>
          <Route path='/weatherdata' element={<WeatherData/>}/>
          <Route path='/requests' element={<Requests/>}/>
      </Routes>
    </>
  )
}

export default App










// import React from 'react'
// import Sidebar from './Components/Sidebar/Sidebar'
// import Main from './Components/Main/Main'

// const App = () => {
//   return (
//     <>
//       <Sidebar/>
//       <Main/>
//     </>
//   )
// }

// export default App