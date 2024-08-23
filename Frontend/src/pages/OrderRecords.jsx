import React from 'react'
import SearchBox from '../Components/SearchBox/SearchBox'

const OrderRecords = () => {
  return (
    <div className="container">
      <SearchBox/>
      <div className="table">
      <table>
          <tr>
            <th>ID</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>  
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>  
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>  
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>  
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>  
          </tr>
          <tr>
            <td>xyz</td>
            <td>xyz</td>
            <td>xyz</td>  
          </tr>
        </table>
      </div>
    </div>
  )
}

export default OrderRecords