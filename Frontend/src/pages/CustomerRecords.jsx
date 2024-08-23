import React from 'react'
import './CustomerRecords.css'
import SearchBox from '../Components/SearchBox/SearchBox'
const CustomerRecords = () => {
  return (
    <div className='container'>
      
        <SearchBox/>

        <div className='table'>

        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            
          </tr>
          <tr>
            <td>Hillary</td>
            <td>xxxxx@gmail.com</td>
            
          </tr>
          <tr>
            <td>saffi</td>
            <td>xxxxx@gmail.com</td>
          </tr>
          <tr>
            <td>Hillary</td>
            <td>xxxxx@gmail.com</td>
            
          </tr>
          <tr>
            <td>saffi</td>
            <td>xxxxx@gmail.com</td>
          </tr>
          <tr>
            <td>Hillary</td>
            <td>xxxxx@gmail.com</td>
            
          </tr>
          <tr>
            <td>saffi</td>
            <td>xxxxx@gmail.com</td>
          </tr>
          <tr>
            <td>Hillary</td>
            <td>xxxxx@gmail.com</td>
            
          </tr>
          <tr>
            <td>saffi</td>
            <td>xxxxx@gmail.com</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default CustomerRecords