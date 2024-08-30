import pytest
from faker import Faker
fake = Faker()

#faker setting up the dummy vars


# # base init test

def test_read_root(test_client):

    response = test_client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Hello": "World"}
    

# # email creation checks
@pytest.mark.timeout(0.5)
def test_create_email(benchmark,test_client): 
    def post_email():
        email_data = fake.email()
        return test_client.post(f"/cemails/?email={email_data}")
    response = benchmark.pedantic(post_email,iterations=1,rounds=10)
    assert response.status_code == 200


def test_create_duplicate_email(benchmark,test_client):
    email_data = "uniqueuser@gmail.com"
    response = test_client.post(f"/cemails/?email={email_data}")
    assert response.status_code == 200
    response = test_client.post(f"/cemails/?email={email_data}")
    assert response.status_code == 400

def test_create_email_with_empty_string(test_client):
    email_data = ""
    response = test_client.post(f"/cemails/?email={email_data}")
    assert response.status_code == 422

def test_create_email_with_long_string(test_client):
    email_data = "a" * 35 + "@gmail.com" 
    response = test_client.post(f"/cemails/?email={email_data}")
    assert response.status_code == 422



# #cnic creation checks

def test_create_cnic(test_client):
    cnic_data = "35202-1016513-2" 
    response = test_client.post(f"/ccnics/?cnic={cnic_data}") 
    assert response.status_code == 200
    assert response.json().get("cnic") == cnic_data

def test_create_cnic_with_empty_string(test_client):
    cnic_data = ""
    response = test_client.post(f"/ccnics/?cnic={cnic_data}")
    assert response.status_code == 422

def test_create_cnic_with_long_string(test_client):
    cnic_data = "1" * 18 
    response = test_client.post(f"/ccnics/?cnic={cnic_data}")
    assert response.status_code == 422

def test_create_duplicate_cnic(test_client):
    cnic_data = "11111-1111111-1"
    response = test_client.post(f"/ccnics/?cnic={cnic_data}")
    assert response.status_code == 200
    response = test_client.post(f"/ccnics/?cnic={cnic_data}")
    assert response.status_code == 400


# #customer creation checks
@pytest.mark.timeout(0.5)
def test_create_customer_success(test_client):
    name = "Jon Doe"
    Cemail_id = 1
    Ccnic_id = 1
    response = test_client.post(f"/customers/?name={name}&Cemail_id={Cemail_id}&Ccnic_id={Ccnic_id}")
    assert response.status_code == 200
    assert response.json().get("name") == name



def test_create_customer_with_empty_name(test_client):
    name = ""
    Cemail_id = 1
    Ccnic_id = 1
    response = test_client.post(f"/customers/?name={name}&Cemail_id={Cemail_id}&Ccnic_id={Ccnic_id}")
    assert response.status_code == 422


def test_create_customer_with_long_name(test_client):
    name = "a" * 21
    Cemail_id = 1
    Ccnic_id = 1
    response = test_client.post(f"/customers/?name={name}&Cemail_id={Cemail_id}&Ccnic_id={Ccnic_id}")
    assert response.status_code == 422


def test_create_duplicate_customer(test_client):
    name = "Jane Doe"
    Cemail_id = 1
    Ccnic_id = 1
    response = test_client.post(f"/customers/?name={name}&Cemail_id={Cemail_id}&Ccnic_id={Ccnic_id}")
    assert response.status_code == 400
    response = test_client.post(f"/customers/?name={name}&Cemail_id={Cemail_id}&Ccnic_id={Ccnic_id}")
    assert response.status_code == 400


def test_create_customer_with_empty_email_id(test_client):
    name = "John Doe"
    Cemail_id = "" 
    Ccnic_id = 1
    response = test_client.post(f"/customers/?name={name}&Cemail_id={Cemail_id}&Ccnic_id={Ccnic_id}")
    assert response.status_code == 422


def test_create_customer_with_empty_cnic_id(test_client):
    name = "John Doe"
    Cemail_id = 1
    Ccnic_id = ""  
    response = test_client.post(f"/customers/?name={name}&Cemail_id={Cemail_id}&Ccnic_id={Ccnic_id}")
    assert response.status_code == 422
# cphone tests
@pytest.mark.timeout(0.5)
def test_create_cphone(test_client):
    phone_data = "123-456-7890" 
    response = test_client.post(f"/cphones/?phone={phone_data}&Customer_id=1") 
    assert response.status_code == 200
    assert response.json().get("phone") == phone_data

def test_create_cphone_with_empty_string(test_client):
    phone_data = ""
    response = test_client.post(f"/cphones/?phone={phone_data}&Customer_id=1")
    assert response.status_code == 422

def test_create_cphone_with_long_string(test_client):
    phone_data = "1" * 13 
    response = test_client.post(f"/cphones/?phone={phone_data}&Customer_id=1")
    assert response.status_code == 422

def test_create_duplicate_cphone(test_client):
    phone_data = "987-654-3210"
    response = test_client.post(f"/cphones/?phone={phone_data}&Customer_id=1")
    assert response.status_code == 200
    response = test_client.post(f"/cphones/?phone={phone_data}&Customer_id=1")
    assert response.status_code == 400


# # mediumtype tests
@pytest.mark.timeout(0.5)
def test_create_mediumtype(benchmark,test_client):
    def post_email():
        type_data = fake.name_nonbinary()
        return test_client.post(f"/mediumtypes/?type={type_data}")
    response = benchmark.pedantic(post_email,iterations=1,rounds=10)
    assert response.status_code == 200

def test_create_mediumtype_with_empty_string(test_client):
    type_data = ""
    response = test_client.post(f"/mediumtypes/?type={type_data}")
    assert response.status_code == 422


# tmedium tests
@pytest.mark.timeout(0.5)
def test_create_tmedium(test_client):
    response = test_client.post(
        f"/tmediums/?weightlimit=1000&speed=200&quantity=50&Mediumtype_id=1"
    )
    assert response.status_code == 200
   
def test_create_tmedium_with_missing_data(test_client):
    response = test_client.post(
        f"/tmediums/?speed=200&quantity=50&Mediumtype_id=1"
    )
    assert response.status_code == 422

def test_create_tmedium_with_negative_values(test_client):
    response = test_client.post(
        f"/tmediums/?weightlimit=-1000&speed=-200&quantity=-50&Mediumtype_id=1"
    )
    assert response.status_code == 422


# # state tests
@pytest.mark.timeout(0.5)
def test_create_state(benchmark,test_client):
    def post_email():
        state_data = fake.name_nonbinary()
        return test_client.post(f"/states/?stateyn={state_data}")
    response=benchmark.pedantic(post_email,iterations=1,rounds=10)
    assert response.status_code == 200

def test_create_state_with_empty_string(test_client):
    state_data = ""
    response = test_client.post(f"/states/?stateyn={state_data}")
    assert response.status_code == 422

# fragile tests
@pytest.mark.timeout(0.5)
def test_create_fragile(benchmark,test_client):
    def post_email():
        fragile_data = fake.name_nonbinary()
        return test_client.post(f"/fragiles/?fragileyesno={fragile_data}")
    response=benchmark.pedantic(post_email,iterations=1,rounds=10)
    assert response.status_code == 200

def test_create_fragile_with_empty_string(test_client):
    fragile_data = ""
    response = test_client.post(f"/fragiles/?fragileyesno={fragile_data}")
    assert response.status_code == 422


# product tests
@pytest.mark.timeout(0.5)
def test_create_product(test_client):
    response = test_client.post(
        f"/products/?name=ProductA&price=100&weight=10&State_id=1&Fragile_id=1"
    )
    assert response.status_code == 200
    assert response.json().get("name") == "ProductA"

def test_create_product_with_missing_data(test_client):
    response = test_client.post(
        f"/products/?price=100&weight=10&State_id=1&Fragile_id=1"
    )
    assert response.status_code == 422

# # order tests
@pytest.mark.timeout(0.5)
def test_create_order(test_client):
    response = test_client.post(
        f"/orders/?quantity=10&totalprice=500"
    )
    assert response.status_code == 200
    assert response.json().get("quantity") == 10

def test_create_order_with_negative_values(test_client):
    response = test_client.post(
        f"/orders/?quantity=-10&totalprice=-500"
    )
    assert response.status_code == 422

# # deliverystatus tests
@pytest.mark.timeout(0.5)
def test_create_deliverystatus(benchmark,test_client):
    def post_email():
        status_data = fake.name_nonbinary()
        return test_client.post(f"/deliverystatuses/?status={status_data}")
    response=benchmark.pedantic(post_email,iterations=1,rounds=10)
    assert response.status_code == 200

def test_create_deliverystatus_with_empty_string(test_client):
    status_data = ""
    response = test_client.post(f"/deliverystatuses/?status={status_data}")
    assert response.status_code == 422


# # delivery tests
@pytest.mark.timeout(0.5)
def test_create_delivery(test_client):
    daddress = "123 Main St"
    dtime = "12:00"
    ddate = "2024-08-15"
    Deliverystatus_id = 1
    response = test_client.post(f"/deliveries/?daddress={daddress}&dtime={dtime}&ddate={ddate}&Deliverystatus_id={Deliverystatus_id}")
    assert response.status_code == 200
    data = response.json()
    assert data.get("daddress") == daddress
    assert data.get("dtime") == dtime
    assert data.get("ddate") == ddate
    assert data.get("Deliverystatus_id") == Deliverystatus_id


def test_create_delivery_with_missing_data(test_client):
    response = test_client.post(
        "/deliveries/?dtime=12:00&ddate=2024-08-15&Deliverystatus_id=1"
    )
    assert response.status_code == 422



# # weathertype tests
@pytest.mark.timeout(0.5)
def test_create_weathertype(benchmark,test_client):
    def post_email():
        type_data = fake.name_nonbinary()
        return test_client.post(f"/weathertypes/?Weather={type_data}")
    response=benchmark.pedantic(post_email,iterations=1,rounds=10)
    assert response.status_code == 200




def test_create_weathertype_with_empty_string(test_client):
    type_data = ""
    response = test_client.post(f"/weathertypes/?Weather={type_data}")
    assert response.status_code == 422


# # weatherdata tests
@pytest.mark.timeout(0.5)
def test_create_weatherdata(test_client):
    response = test_client.post(
        f"/weatherdatas/?date=2024-08-15&humidity=60&pressure=1012&wind=10&Weathertype_id=1"
    )
    assert response.status_code == 200
    assert response.json().get("date") == "2024-08-15"

def test_create_weatherdata_with_missing_data(test_client):
    response = test_client.post(
        f"/weatherdatas/?humidity=60&pressure=1012&wind=10&Weathertype_id=1"
    )
    assert response.status_code == 422

def test_create_weatherdata_with_negative_values(test_client):
    response = test_client.post(
        f"/weatherdatas/?date=2024-08-15&humidity=-60&pressure=-1012&wind=-10&Weathertype_id=1"
    )
    assert response.status_code == 422


# # warehousephone tests
@pytest.mark.timeout(0.5)
def test_create_warehousephone(test_client):
    phone_data = "123-456-7890"
    response = test_client.post(f"/warehousephones/?phone={phone_data}")
    assert response.status_code == 200
    assert response.json().get("phone") == phone_data

def test_create_warehousephone_with_empty_string(test_client):
    phone_data = ""
    response = test_client.post(f"/warehousephones/?phone={phone_data}")
    assert response.status_code == 422


# # warehousepostal tests
@pytest.mark.timeout(0.5)
def test_create_warehousepostal(test_client):
    postal_data = "12345"
    response = test_client.post(f"/warehousepostals/?postal={postal_data}")
    assert response.status_code == 200
    assert response.json().get("postal") == postal_data

def test_create_warehousepostal_with_empty_string(test_client):
    postal_data = ""
    response = test_client.post(f"/warehousepostals/?postal={postal_data}")
    assert response.status_code == 422

# warehouselocation tests
@pytest.mark.timeout(0.5)
def test_create_warehouselocation(benchmark,test_client):
    def post_email():
        location_data = fake.name_nonbinary()
        return test_client.post(f"/warehouselocations/?location={location_data}")
    response=benchmark.pedantic(post_email,iterations=1,rounds=10)
    assert response.status_code == 200
   
# # warehouse tests
@pytest.mark.timeout(0.5)
def test_create_warehouse(test_client):
    response = test_client.post(
        f"/warehouses/?name=WarehouseA&Warehousepostal_id=1&Warehouselocation_id=1&Warehousephone_id=1"
    )
    assert response.status_code == 200
    assert response.json().get("name") == "WarehouseA"

def test_create_warehouse_with_missing_data(test_client):
    response = test_client.post(
        f"/warehouses/?name=WarehouseA&Warehousepostal_id=1"
    )
    assert response.status_code == 422