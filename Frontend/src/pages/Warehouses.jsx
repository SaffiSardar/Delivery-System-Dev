import React from 'react'
import SearchBox from '../Components/SearchBox/SearchBox'

const Warehouses = () => {
  return (
    <div className="container">
      <SearchBox/>
      <div className="table">
      <table>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Landline No.</th>
            <th>Postal Code</th>
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td> 
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td> 
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td> 
          </tr>
        </table>
        <button>Add new warehouse</button>
      </div>
    </div>
  )
}

export default Warehouses