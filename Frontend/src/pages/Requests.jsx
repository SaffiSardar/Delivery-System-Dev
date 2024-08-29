import React from 'react'

const Requests = () => {
  return (
    <div className="request-container">
    <div className="requestpanel">
        <div className="box1">
            <button type="submit">Request New Medium</button>
            <form>
                <label>
                    Name:
                    <input type="text" name="mediumName" />
                </label>
                <label>
                    Type:
                    <input type="text" name="mediumType" />
                </label>
                <label>
                    Speed Limit:
                    <input type="text" name="capacity" />
                </label>
                <label>
                    Quantity:
                    <input type="text" name="status" />
                </label>
            </form>        
        </div>
        <div className="box2">
            <button type="submit">New Warehouse</button>
            <form>
                <label>
                    Name:
                    <input type="text" name="warehouseName" />
                </label>
                <label>
                    Location:
                    <input type="text" name="location" />
                </label>
                <label>
                    Landline No:
                    <input type="text" name="capacity" />
                </label>
                <label>
                    Postal Code:
                    <input type="text" name="contactNumber" />
                </label>
            </form>
            
        </div>
        <div className="box3">
            <button type="submit">New Product</button>
            <form>
                <label>
                    Name:
                    <input type="text" name="productName" />
                </label>
                <label>
                    Price:
                    <input type="text" name="productCode" />
                </label>
                <label>
                    State:
                    <input type="text" name="price" />
                </label>
                <label>
                    Weight:
                    <input type="text" name="quantity" />
                </label>
                <label>
                    Fragile:
                    <input type="text" name="description" />
                </label>
            
            </form>
        </div>
    </div>
</div>

  )
}

export default Requests