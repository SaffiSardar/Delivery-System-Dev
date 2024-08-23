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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Address</th>
          </tr>
          <tr>
            <td>Hillary</td>
            <td>Nyakundi</td>
            <td>tables@mail.com</td>
          </tr>
          <tr>
            <td>Lary</td>
            <td>Mak</td>
            <td>developer@mail.com</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default CustomerRecords