from sqlalchemy import Column, Integer, String,ForeignKey,CheckConstraint
from sqlalchemy.orm import relationship
from database import Base





class cemail(Base):
    __tablename__ = 'cemails'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(40), nullable=False, unique=True, index=True)
    customers = relationship("customer", back_populates="Cemail")

class ccnic(Base):
    __tablename__ = 'ccnics'
    id = Column(Integer, primary_key=True, index=True)
    cnic = Column(String(15), nullable=False, unique=True, index=True)
    customers = relationship("customer", back_populates="Ccnic")

class customer(Base):
    __tablename__ = 'customers'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(20), nullable=False, index=True, unique=True)
    Cemail_id = Column(Integer, ForeignKey('cemails.id'), unique=True)
    Ccnic_id = Column(Integer, ForeignKey('ccnics.id'), unique=True)
    Ccnic = relationship("ccnic", back_populates="customers", uselist=False)
    Cemail = relationship("cemail", back_populates="customers", uselist=False)
    Cphones = relationship("cphone", back_populates="Customer")

class cphone(Base):
    __tablename__ = 'cphones'
    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(12), nullable=False, unique=True, index=True)  
    Customer_id = Column(Integer, ForeignKey('customers.id'))
    Customer = relationship("customer", back_populates="Cphones")


class tmedium(Base):
    __tablename__ = 'tmediums'
    id = Column(Integer, primary_key=True, index=True)
    weightlimit = Column(Integer, nullable=False, index=True)  
    speed = Column(Integer, nullable=False, index=True)  
    quantity = Column(Integer, nullable=False, index=True)  
    Mediumtype_id = Column(Integer, ForeignKey('mediumtypes.id'))
    Mediumtype = relationship("mediumtype", back_populates="Tmedium")


class mediumtype(Base):
    __tablename__ = 'mediumtypes'
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False, index=True)  
    Tmedium = relationship("tmedium", back_populates="Mediumtype")


class product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)  
    price = Column(Integer, nullable=False, index=True)  
    weight = Column(Integer, nullable=False, index=True)  
    State_id = Column(Integer, ForeignKey('states.id'))
    State = relationship("state", back_populates="Product")
    Fragile_id = Column(Integer, ForeignKey('fragiles.id'))
    Fragile = relationship("fragile", back_populates="Product")


class state(Base):
    __tablename__ = 'states'
    id = Column(Integer, primary_key=True, index=True)
    stateyn = Column(String, nullable=False, index=True)  
    Product = relationship("product", back_populates="State")


class fragile(Base):
    __tablename__ = 'fragiles'
    id = Column(Integer, primary_key=True, index=True)
    fragileyesno = Column(String, nullable=False, index=True)  
    Product = relationship("product", back_populates="Fragile")


class order(Base):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True, index=True)
    quantity = Column(Integer, nullable=False, index=True)  
    totalprice = Column(Integer, nullable=False, index=True)  


class delivery(Base):
    __tablename__ = 'deliveries'
    id = Column(Integer, primary_key=True, index=True)
    daddress = Column(String, nullable=False, index=True)  
    dtime = Column(String, nullable=False, index=True)  
    ddate = Column(String, nullable=False, index=True)  
    Deliverystatus_id = Column(Integer, ForeignKey('deliverystatuses.id'))
    Deliverystatus = relationship("deliverystatus", back_populates="Delivery")


class deliverystatus(Base):
    __tablename__ = 'deliverystatuses'
    id = Column(Integer, primary_key=True, index=True)
    status = Column(String, nullable=False, index=True)  
    Delivery = relationship("delivery", back_populates="Deliverystatus")


class Weatherdata(Base):
    __tablename__ = 'weatherdatas'
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False, index=True)  
    humidity = Column(Integer, nullable=False, index=True)  
    pressure = Column(Integer, nullable=False, index=True)  
    wind = Column(Integer, nullable=False, index=True)  
    Weathertype_id = Column(Integer, ForeignKey('weathertypes.id'))
    Weathertype = relationship("weathertype", back_populates="weatherdata")


class weathertype(Base):
    __tablename__ = 'weathertypes'
    id = Column(Integer, primary_key=True, index=True)
    Weather = Column(String, nullable=False, index=True)  
    weatherdata = relationship("Weatherdata", back_populates="Weathertype")


class warehouse(Base):
    __tablename__ = 'warehouses'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)  
    Warehousepostal_id = Column(Integer, ForeignKey('warehousepostals.id')) 
    Warehouselocation_id = Column(Integer, ForeignKey('warehouselocations.id')) 
    Warehousephone_id = Column(Integer, ForeignKey('warehousephones.id')) 
    Warehousepostal = relationship("warehousepostal", back_populates="Warehouse", uselist=False)
    Warehouselocation = relationship("warehouselocation", back_populates="Warehouse", uselist=False)
    Warehousephone = relationship("warehousephone", back_populates="Warehouse", uselist=False)


class warehousepostal(Base):
    __tablename__ = 'warehousepostals'
    id = Column(Integer, primary_key=True, index=True)
    postal = Column(String, nullable=False, index=True)  
    Warehouse = relationship("warehouse", back_populates="Warehousepostal")


class warehouselocation(Base):
    __tablename__ = 'warehouselocations'
    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, nullable=False, index=True)  
    Warehouse = relationship("warehouse", back_populates="Warehouselocation")


class warehousephone(Base):
    __tablename__ = 'warehousephones'
    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String, nullable=False, index=True)  
    Warehouse = relationship("warehouse", back_populates="Warehousephone")
