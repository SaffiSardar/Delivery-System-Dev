import React from 'react'
import './CustomerRecords.css'
import Button from '../Components/Button/Button'
import SearchInput from '../Components/SearchInput/SearchInput'

const CustomerRecords = () => {
  return (
    <div className='container'>
      <div className="searchbox">
        <SearchInput/>
        <Button/>
      </div>
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