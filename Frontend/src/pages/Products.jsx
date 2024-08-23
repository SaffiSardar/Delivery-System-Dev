import React from 'react'
import SearchBox from '../Components/SearchBox/SearchBox'

const Products = () => {
  return (
    <div className="container">
      <SearchBox/>
      <div className="table">
      <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SOM</th>
            <th>Price</th>
            <th>Weight</th>
          </tr>
          <tr>
            <td>xyz</td>
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
            <td>xyz</td>  
          </tr>
          <tr>
            <td>xyz</td>
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
            <td>xyz</td>  
          </tr>
          <tr>
            <td>xyz</td>
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
            <td>xyz</td>  
          </tr>
        </table>
        <button>Add new product</button>
      </div>
    </div>
  )
}

export default Products