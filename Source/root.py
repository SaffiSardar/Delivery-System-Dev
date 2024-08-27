import uvicorn
from sqlalchemy.orm import Session
from fastapi import FastAPI,HTTPException,Query
from model import customer,cemail,ccnic,cphone,tmedium,mediumtype,product,order,delivery,deliverystatus,weathertype,Weatherdata,warehousephone,warehousepostal,warehouselocation,warehouse,state,fragile
from database import LocalSession
from sqlalchemy.exc import IntegrityError
from typing import Optional


#allowing frontend connection
from fastapi.middleware.cors import CORSMiddleware




#api creation
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

#creating endpoints - CRUD

#POST(create)



@app.post("/cemails/")
async def create_email(email: str = Query(..., min_length=1, max_length=40)):
    if len(email) > 40:
        raise HTTPException(status_code=400, detail="Email cannot exceed 40 characters")
    if not email.strip():
        raise HTTPException(status_code=422, detail="Email cannot be an empty string")
    db = LocalSession()
    try:
        existing_email = db.query(cemail).filter(cemail.email == email).first()
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already exists")
        new_email = cemail(email=email)
        db.add(new_email)
        db.commit()
        db.refresh(new_email)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Error occurred while adding the email")
    finally:
        db.close()
    return new_email


@app.post("/ccnics/")
async def create_cnic(cnic:str = Query(..., min_length=1, max_length=15)):
      if len(cnic) > 15:
        raise HTTPException(status_code=400, detail="cnic cannot exceed 15 characters")
      if not cnic.strip():
        raise HTTPException(status_code=422, detail="cnic cannot be an empty string")
      db = LocalSession()
      try:
        existing_cnic = db.query(ccnic).filter(ccnic.cnic == cnic).first()
        if existing_cnic:
            raise HTTPException(status_code=400, detail="cnic already exists")
        new_cnic = ccnic(cnic=cnic)
        db.add(new_cnic)
        db.commit()
        db.refresh(new_cnic)
      except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Error")
      finally:
        db.close()
      return new_cnic
      

@app.post("/customers/")
async def create_customer(
    name: str = Query(..., min_length=1, max_length=20),
    Cemail_id: Optional[int] = Query(..., ge=0),
    Ccnic_id: Optional[int] = Query(..., ge=0)
):
    print(f"Received data - Name: {name}, Email ID: {Cemail_id}, CNIC ID: {Ccnic_id}")

    if len(name) > 20:
        raise HTTPException(status_code=400, detail="Name cannot exceed 20 characters")
    if not name.strip():
        raise HTTPException(status_code=422, detail="Name cannot be an empty string")

    db = LocalSession()
    try:
        if Cemail_id is None or Cemail_id <= 0:
            raise HTTPException(status_code=422, detail="Email ID cannot be empty or zero")
        if Ccnic_id is None or Ccnic_id <= 0:
            raise HTTPException(status_code=422, detail="CNIC ID cannot be empty or zero")

        existing_customer = db.query(customer).filter(customer.name == name).first()
        if existing_customer:
            raise HTTPException(status_code=400, detail="Customer already exists")
        
        new_customer = customer(name=name, Cemail_id=Cemail_id, Ccnic_id=Ccnic_id)
        db.add(new_customer)
        db.commit()
        db.refresh(new_customer)
        return new_customer
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()




@app.post("/cphones/")
async def create_cphone(
    phone: str = Query(..., min_length=1, max_length=12),
    Customer_id: Optional[int] = Query(..., ge=0)
):
    print(f"Received data - Phone: {phone}, Customer ID: {Customer_id}")

    if len(phone) > 12:
        raise HTTPException(status_code=400, detail="Phone number cannot exceed 12 characters")
    if not phone.strip():
        raise HTTPException(status_code=422, detail="Phone number cannot be an empty string")

    db = LocalSession()
    try:
        existing_cphone = db.query(cphone).filter(cphone.phone == phone).first()
        if existing_cphone:
            raise HTTPException(status_code=400, detail="Phone number already exists")
        
        new_cphone = cphone(phone=phone, Customer_id=Customer_id)
        db.add(new_cphone)
        db.commit()
        db.refresh(new_cphone)
        return new_cphone
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()

      
@app.post("/tmediums/")
async def create_tmedium(
    name: str = Query(..., min_length=1),
    weightlimit: int = Query(..., ge=0),
    speed: int = Query(..., ge=0),
    quantity: int = Query(..., ge=0),
    Mediumtype_id: Optional[int] = Query(..., ge=0)
):
    print(f"Received data - Name: {name}, Weight Limit: {weightlimit}, Speed: {speed}, Quantity: {quantity}, Mediumtype ID: {Mediumtype_id}")

    if not name.strip():
        raise HTTPException(status_code=422, detail="Name cannot be an empty string")

    db = LocalSession()
    try:
        new_tmedium = tmedium(name=name, weightlimit=weightlimit, speed=speed, quantity=quantity, Mediumtype_id=Mediumtype_id)
        db.add(new_tmedium)
        db.commit()
        db.refresh(new_tmedium)
        return new_tmedium
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()

      
@app.post("/mediumtypes/")
async def create_mediumtype(
    type: str = Query(..., min_length=1)
):
    print(f"Received data - Type: {type}")

    if not type.strip():
        raise HTTPException(status_code=422, detail="Type cannot be an empty string")

    db = LocalSession()
    try:
        new_mediumtype = mediumtype(type=type)
        db.add(new_mediumtype)
        db.commit()
        db.refresh(new_mediumtype)
        return new_mediumtype
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()


@app.post("/products/")
async def create_product(
    name: str = Query(..., min_length=1),
    price: int = Query(..., ge=0),
    weight: int = Query(..., ge=0),
    State_id: Optional[int] = Query(..., ge=0),
    Fragile_id: Optional[int] = Query(..., ge=0)
):
    print(f"Received data - Name: {name}, Price: {price}, Weight: {weight}, State ID: {State_id}, Fragile ID: {Fragile_id}")

    if not name.strip():
        raise HTTPException(status_code=422, detail="Name cannot be an empty string")

    db = LocalSession()
    try:
        new_product = product(name=name, price=price, weight=weight, State_id=State_id, Fragile_id=Fragile_id)
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return new_product
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()

      
@app.post("/states/")
async def create_state(
    stateyn: str = Query(..., min_length=1)
):
    print(f"Received data - State: {stateyn}")

    if not stateyn.strip():
        raise HTTPException(status_code=422, detail="State cannot be an empty string")

    db = LocalSession()
    try:
        new_state = state(stateyn=stateyn)
        db.add(new_state)
        db.commit()
        db.refresh(new_state)
        return new_state
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()


@app.post("/fragiles/")
async def create_fragile(
    fragileyesno: str = Query(..., min_length=1)
):
    print(f"Received data - Fragile: {fragileyesno}")

    if not fragileyesno.strip():
        raise HTTPException(status_code=422, detail="Fragile cannot be an empty string")

    db = LocalSession()
    try:
        new_fragile = fragile(fragileyesno=fragileyesno)
        db.add(new_fragile)
        db.commit()
        db.refresh(new_fragile)
        return new_fragile
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()


@app.post("/orders/")
async def create_order(
    quantity: int = Query(..., ge=0),
    totalprice: int = Query(..., ge=0)
):
    print(f"Received data - Quantity: {quantity}, Total Price: {totalprice}")

    db = LocalSession()
    try:
        new_order = order(quantity=quantity, totalprice=totalprice)
        db.add(new_order)
        db.commit()
        db.refresh(new_order)
        return new_order
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()

      
@app.post("/deliveries/")
async def create_delivery(
    daddress: str = Query(..., min_length=1),
    dtime: str = Query(..., min_length=1),
    ddate: str = Query(..., min_length=1),
    Deliverystatus_id: Optional[int] = Query(..., ge=0)
):
    print(f"Received data - Address: {daddress}, Time: {dtime}, Date: {ddate}, Delivery Status ID: {Deliverystatus_id}")

    if not daddress.strip() or not dtime.strip() or not ddate.strip():
        raise HTTPException(status_code=422, detail="Address, Time, and Date cannot be empty strings")

    db = LocalSession()
    try:
        new_delivery = delivery(daddress=daddress, dtime=dtime, ddate=ddate, Deliverystatus_id=Deliverystatus_id)
        db.add(new_delivery)
        db.commit()
        db.refresh(new_delivery)
        return new_delivery
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()

      
@app.post("/deliverystatuses/")
async def create_deliverystatus(
    status: str = Query(..., min_length=1)
):
    print(f"Received data - Status: {status}")

    if not status.strip():
        raise HTTPException(status_code=422, detail="Status cannot be an empty string")

    db = LocalSession()
    try:
        new_deliverystatus = deliverystatus(status=status)
        db.add(new_deliverystatus)
        db.commit()
        db.refresh(new_deliverystatus)
        return new_deliverystatus
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()



@app.post("/weatherdatas/")
async def create_weatherdata(
    date: str = Query(..., min_length=1),
    humidity: int = Query(..., ge=0),
    pressure: int = Query(..., ge=0),
    wind: int = Query(..., ge=0),
    Weathertype_id: Optional[int] = Query(..., ge=0)
):
    print(f"Received data - Date: {date}, Humidity: {humidity}, Pressure: {pressure}, Wind: {wind}, Weathertype ID: {Weathertype_id}")

    if not date.strip():
        raise HTTPException(status_code=422, detail="Date cannot be an empty string")

    db = LocalSession()
    try:
        new_weatherdata = Weatherdata(
            date=date,
            humidity=humidity,
            pressure=pressure,
            wind=wind,
            Weathertype_id=Weathertype_id
        )
        db.add(new_weatherdata)
        db.commit()
        db.refresh(new_weatherdata)
        return new_weatherdata
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()

      
@app.post("/weathertypes/")
async def create_weathertype(
    Weather: str = Query(..., min_length=1)
):
    print(f"Received data - Weather: {Weather}")

    if not Weather.strip():
        raise HTTPException(status_code=422, detail="Weather cannot be an empty string")

    db = LocalSession()
    try:
        new_weathertype = weathertype(Weather=Weather)
        db.add(new_weathertype)
        db.commit()
        db.refresh(new_weathertype)
        return new_weathertype
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()


@app.post("/warehousephones/")
async def create_warehousephone(
    phone: str = Query(..., min_length=1)
):
    print(f"Received data - Phone: {phone}")

    if not phone.strip():
        raise HTTPException(status_code=422, detail="Phone cannot be an empty string")

    db = LocalSession()
    try:
        new_warehousephone = warehousephone(phone=phone)
        db.add(new_warehousephone)
        db.commit()
        db.refresh(new_warehousephone)
        return new_warehousephone
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()


@app.post("/warehousepostals/")
async def create_warehousepostal(
    postal: str = Query(..., min_length=1)
):
    print(f"Received data - Postal: {postal}")

    if not postal.strip():
        raise HTTPException(status_code=422, detail="Postal cannot be an empty string")

    db = LocalSession()
    try:
        new_warehousepostal = warehousepostal(postal=postal)
        db.add(new_warehousepostal)
        db.commit()
        db.refresh(new_warehousepostal)
        return new_warehousepostal
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()


@app.post("/warehouselocations/")
async def create_warehouselocation(
    location: str = Query(..., min_length=1)
):
    print(f"Received data - Location: {location}")

    if not location.strip():
        raise HTTPException(status_code=422, detail="Location cannot be an empty string")

    db = LocalSession()
    try:
        new_warehouselocation = warehouselocation(location=location)
        db.add(new_warehouselocation)
        db.commit()
        db.refresh(new_warehouselocation)
        return new_warehouselocation
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()


@app.post("/warehouses/")
async def create_warehouse(
    name: str = Query(..., min_length=1),
    Warehousepostal_id: Optional[int] = Query(..., ge=0),
    Warehouselocation_id: Optional[int] = Query(..., ge=0),
    Warehousephone_id: Optional[int] = Query(..., ge=0)
):
    print(f"Received data - Name: {name}, Warehousepostal ID: {Warehousepostal_id}, Warehouselocation ID: {Warehouselocation_id}, Warehousephone ID: {Warehousephone_id}")

    if not name.strip():
        raise HTTPException(status_code=422, detail="Name cannot be an empty string")

    db = LocalSession()
    try:
        new_warehouse = warehouse(
            name=name,
            Warehousepostal_id=Warehousepostal_id,
            Warehouselocation_id=Warehouselocation_id,
            Warehousephone_id=Warehousephone_id
        )
        db.add(new_warehouse)
        db.commit()
        db.refresh(new_warehouse)
        return new_warehouse
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database Integrity Error: {str(e)}")
    finally:
        db.close()










#READ(get)

@app.get("/customers/{customer_id}")
async def read_customer(customer_id: int):
    db = LocalSession()
    customer_init = db.query(customer).filter(customer.id == customer_id).first()
    return customer_init

@app.get("/cemails/{cemail_id}")
async def read_email(cemail_id:str):
    db = LocalSession()
    cemail_init = db.query(cemail).filter(cemail.id == cemail_id).first()
    return cemail_init       

@app.get("/ccnics/{ccnic_id}")
async def read_cnic(ccnic_id:str):
    db = LocalSession()
    ccnic_init = db.query(ccnic).filter(ccnic.id == ccnic_id).first()
    return ccnic_init
      
@app.get("/cphones/{cphone_id}")
async def read_phone(cphone_id:str):
    db = LocalSession()
    cphone_init = db.query(cphone).filter(cphone.id == cphone_id).first()
    return cphone_init
      
@app.get("/tmediums/{tmedium_id}")
async def read_medium(tmedium_id:str):
    db = LocalSession()
    tmedium_init = db.query(tmedium).filter(tmedium.id == tmedium_id).first()
    return tmedium_init

@app.get("/mediumtypes/{mediumtype_id}")
async def read_mediumtype(mediumtype_id:str):
    db = LocalSession()
    mediumtype_init = db.query(mediumtype).filter(mediumtype.id == mediumtype_id).first()
    return mediumtype_init

@app.get("/products/{product_id}")
async def read_product(product_id:str):
    db = LocalSession()
    product_init = db.query(product).filter(product.id == product_id).first()
    return product_init
      
@app.get("/states/{state_id}")
async def read_state(state_id:str):
    db = LocalSession()
    state_init = db.query(state).filter(state.id == state_id).first()
    return state_init

@app.get("/fragiles/{fragile_id}")
async def read_fragile(fragile_id:str):
    db = LocalSession()
    fragile_init = db.query(fragile).filter(fragile.id == fragile_id).first()
    return fragile_init

@app.get("/orders/{order_id}")
async def read_order(order_id:str):
    db = LocalSession()
    order_init = db.query(order).filter(order.id == order_id).first()
    return order_init
      
@app.get("/deliveries/{delivery_id}")
async def read_delivery(delivery_id:str):
    db = LocalSession()
    delivery_init = db.query(delivery).filter(delivery.id == delivery_id).first()
    return delivery_init
      
@app.get("/deliverystatuses/{deliverystatus_id}")
async def read_deliverystatus(deliverystatus_id:str):
    db = LocalSession()
    deliverystatus_init = db.query(deliverystatus).filter(deliverystatus.id == deliverystatus_id).first()
    return deliverystatus_init

@app.get("/weatherdatas/{weatherdata_id}")
async def read_weatherdata(weatherdata_id:str):
    db = LocalSession()
    Weatherdata_init = db.query(Weatherdata).filter(Weatherdata.id == weatherdata_id).first()
    return Weatherdata_init
      
@app.get("/weathertypes/{weathertype_id}")
async def create_weathertype(weathertype_id:str):
    db = LocalSession()
    weathertype_init = db.query(weathertype).filter(weathertype.id == weathertype_id).first()
    return weathertype_init

@app.get("/warehousephones/{warehousephone_id}")
async def read_warehousephone(warehousephone_id: str):
    db = LocalSession()
    warehousephone_init = db.query(warehousephone).filter(warehousephone.id == warehousephone_id).first()
    return warehousephone_init

@app.get("/warehousepostals/{warehousepostals_id}")
async def read_warehousepostal(warehousepostals_id: str):
    db = LocalSession()
    warehousepostal_init = db.query(warehousepostal).filter(warehousepostal.id == warehousepostals_id).first()
    return warehousepostal_init

@app.get("/warehouselocations/{warehouselocation_id}")
async def read_warehouselocation(warehouselocation_id: str):
    db = LocalSession()
    warehouselocation_init = db.query(warehouselocation).filter(warehouselocation.id == warehouselocation_id).first()
    return warehouselocation_init

@app.get("/warehouses/{warehouse_id}")
async def read_warehouse(warehouse_id: str):
    db = LocalSession()
    warehouse_init = db.query(warehouse).filter(warehouse.id == warehouse_id).first()
    return warehouse_init














#UPDATE(PUT)

@app.put("/customers/{customer_id}")
async def update_customer(customer_id: int,name:str,cemail_id:int,ccnic_id:int):
    db = LocalSession()
    customer_init = db.query(customer).filter(customer.id == customer_id).first()
    customer_init.name = name
    customer_init.Cemail_id = cemail_id
    customer_init.Ccnic_id = ccnic_id
    db.commit()
    return customer_init

@app.put("/cemails/{cemail_id}")
async def update_email(cemail_id:str,email:str):
    db = LocalSession()
    cemail_init = db.query(cemail).filter(cemail.id == cemail_id).first()
    cemail_init.email = email
    db.commit()
    return cemail_init       

@app.put("/ccnics/{ccnic_id}")
async def update_cnic(ccnic_id:str,cnic:str):
    db = LocalSession()
    ccnic_init = db.query(ccnic).filter(ccnic.id == ccnic_id).first()
    ccnic_init.cnic = cnic
    db.commit()
    return ccnic_init
      
@app.put("/cphones/{cphone_id}")
async def update_phone(cphone_id:str,phone:str):
    db = LocalSession()
    cphone_init = db.query(cphone).filter(cphone.id == cphone_id).first()
    cphone_init.phone = phone
    db.commit()
    return cphone_init
      
@app.put("/tmediums/{tmedium_id}")
async def update_medium(tmedium_id:str,name:str,weightlimit:int,speed:int,quantity:int,Mediumtype_id:int):
    db = LocalSession()
    tmedium_init = db.query(tmedium).filter(tmedium.id == tmedium_id).first()
    tmedium_init.name=name
    tmedium_init.weightlimit = weightlimit
    tmedium_init.speed = speed
    tmedium_init.quantity = quantity
    tmedium_init.Mediumtype_id = Mediumtype_id
    db.commit()
    return tmedium_init

@app.put("/products/{product_id}")
async def update_product(product_id:str,name:str,price:int,weight:int,State_id:int,Fragile_id:int):
    db = LocalSession()
    product_init = db.query(product).filter(product.id == product_id).first()
    product_init.name = name
    product_init.price = price
    product_init.weight = weight
    product_init.State_id = State_id
    product_init.Fragile_id = Fragile_id
    db.commit()
    return product_init

@app.put("/orders/{order_id}")
async def update_order(order_id:str,quantity:int,totalprice:int):
    db = LocalSession()
    order_init = db.query(order).filter(order.id == order_id).first()
    order_init.quantity = quantity
    order_init.totalprice = totalprice
    db.commit()
    return order_init
      
@app.put("/deliveries/{delivery_id}")
async def update_delivery(delivery_id:str,daddress:str,dtime:str,ddate:str,Deliverystatus_id:int):
    db = LocalSession()
    delivery_init = db.query(delivery).filter(delivery.id == delivery_id).first()
    delivery_init.daddress = daddress
    delivery_init.dtime = dtime
    delivery_init.ddate = ddate
    delivery_init.Deliverystatus_id=Deliverystatus_id
    db.commit()
    return delivery_init

@app.put("/weatherdatas/{weatherdata_id}")
async def update_weatherdata(weatherdata_id:str,date:str,humidity:int,pressure:int,wind:int,weathertye_id:int):
    db = LocalSession()
    Weatherdata_init = db.query(Weatherdata).filter(Weatherdata.id == weatherdata_id).first()
    Weatherdata_init.date = date
    Weatherdata_init.humidity = humidity
    Weatherdata_init.pressure = pressure
    Weatherdata_init.wind = wind
    Weatherdata_init.Weathertype_id = weatherdata_id
    db.commit()
    return Weatherdata_init

@app.put("/warehousephones/{warehousephone_id}")
async def update_warehousephone(warehousephone_id: str,phone:str):
    db = LocalSession()
    warehousephone_init = db.query(warehousephone).filter(warehousephone.id == warehousephone_id).first()
    warehousephone_init.phone=phone
    db.commit()
    return warehousephone_init

@app.put("/warehousepostals/{warehousepostals_id}")
async def update_warehousepostal(warehousepostals_id: str,postal:str):
    db = LocalSession()
    warehousepostal_init = db.query(warehousepostal).filter(warehousepostal.id == warehousepostals_id).first()
    warehousepostal_init.postal =postal
    db.commit()
    return warehousepostal_init

@app.put("/warehouselocations/{warehouselocation_id}")
async def update_warehouselocation(warehouselocation_id: str,location:str):
    db = LocalSession()
    warehouselocation_init = db.query(warehouselocation).filter(warehouselocation.id == warehouselocation_id).first()
    warehouselocation_init.location=location
    return warehouselocation_init

@app.put("/warehouses/{warehouse_id}")
async def update_warehouse(warehouse_id: str,name:str,Warehousepostal_id:int,Warehouselocation_id:int,warehousephone_id:int):
    db = LocalSession()
    warehouse_init = db.query(warehouse).filter(warehouse.id == warehouse_id).first()
    warehouse_init.name=name
    warehouse_init.Warehousepostal_id=Warehousepostal_id
    warehouse_init.Warehouselocation_id=Warehouselocation_id
    warehouse_init.Warehousephone_id=warehousephone_id
    db.commit()
    return warehouse_init















#DELETE(delete)

@app.delete("/customers/{customer_id}")
async def delete_customer(customer_id: int):
    db = LocalSession()
    customer_init = db.query(customer).filter(customer.id == customer_id).first()
    db.delete(customer_init)
    db.commit()
    return {"message": "deleted"}

@app.delete("/cemails/{cemail_id}")
async def delete_email(cemail_id:str):
    db = LocalSession()
    cemail_init = db.query(cemail).filter(cemail.id == cemail_id).first()
    db.delete(cemail_init)
    db.commit()
    return {"message": "deleted"}      

@app.delete("/ccnics/{ccnic_id}")
async def delete_cnic(ccnic_id:str):
    db = LocalSession()
    ccnic_init = db.query(ccnic).filter(ccnic.id == ccnic_id).first()
    db.delete(ccnic_init)
    db.commit()
    return {"message": "deleted"}
      
@app.delete("/cphones/{cphone_id}")
async def delete_phone(cphone_id:str):
    db = LocalSession()
    cphone_init = db.query(cphone).filter(cphone.id == cphone_id).first()
    db.delete(cphone_init)
    db.commit()
    return {"message": "deleted"}
      
@app.delete("/tmediums/{tmedium_id}")
async def delete_medium(tmedium_id:str):
    db = LocalSession()
    tmedium_init = db.query(tmedium).filter(tmedium.id == tmedium_id).first()
    db.delete(tmedium_init)
    db.commit()
    return {"message": "deleted"}

@app.delete("/products/{product_id}")
async def delete_product(product_id:str):
    db = LocalSession()
    product_init = db.query(product).filter(product.id == product_id).first()
    db.delete(product_init)
    db.commit()
    return {"message": "deleted"}

@app.delete("/orders/{order_id}")
async def delete_order(order_id:str):
    db = LocalSession()
    order_init = db.query(order).filter(order.id == order_id).first()
    db.delete(order_init)
    db.commit()
    return {"message": "deleted"}
      
@app.delete("/deliveries/{delivery_id}")
async def delete_delivery(delivery_id:str):
    db = LocalSession()
    delivery_init = db.query(delivery).filter(delivery.id == delivery_id).first()
    db.delete(delivery_init)
    db.commit()
    return {"message": "deleted"}

@app.delete("/weatherdatas/{weatherdata_id}")
async def delete_weatherdata(weatherdata_id:str):
    db = LocalSession()
    Weatherdata_init = db.query(Weatherdata).filter(Weatherdata.id == weatherdata_id).first()
    db.delete(Weatherdata_init)
    db.commit()
    return {"message": "deleted"}

@app.delete("/warehousephones/{warehousephone_id}")
async def delete_warehousephone(warehousephone_id: str):
    db = LocalSession()
    warehousephone_init = db.query(warehousephone).filter(warehousephone.id == warehousephone_id).first()
    db.delete(warehousephone_init)
    db.commit()
    return {"message": "deleted"}

@app.delete("/warehousepostals/{warehousepostals_id}")
async def delete_warehousepostal(warehousepostals_id: str):
    db = LocalSession()
    warehousepostal_init = db.query(warehousepostal).filter(warehousepostal.id == warehousepostals_id).first()
    db.delete(warehousepostal_init)
    db.commit()
    return {"message": "deleted"}

@app.delete("/warehouselocations/{warehouselocation_id}")
async def delete_warehouselocation(warehouselocation_id: str):
    db = LocalSession()
    warehouselocation_init = db.query(warehouselocation).filter(warehouselocation.id == warehouselocation_id).first()
    db.delete(warehouselocation_init)
    db.commit()
    return {"message": "deleted"}

@app.delete("/warehouses/{warehouse_id}")
async def delete_warehouse(warehouse_id: str):
    db = LocalSession()
    warehouse_init = db.query(warehouse).filter(warehouse.id == warehouse_id).first()
    db.delete(warehouse_init)
    db.commit()
    return {"message": "deleted"}


if __name__ == "__main__":
    uvicorn.run(app)




