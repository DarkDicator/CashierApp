import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import itemDataService from "../services/items.js"
import userDataService from "../services/user.js"
import "bootstrap/dist/css/bootstrap.min.css";

const ItemList = props => {

  console.log(props)

  const [items, setItems] = useState([])
  const [user, setUser] = useState({})
  const [addItem, setAddItem] = useState()
  const [counter, setCounter] = useState(1)
  const [order, setOrder] = useState([])
  const [orderTotal, setOrderTotal] = useState(0)

  useEffect(() => {
    if (props.user !== null){
      retrieveItems(props.user._id)
    }
  }, [])
  
  const retrieveItems = (id) => {
    itemDataService.getItems(id)
      .then(response => {
        console.log(response.data)
        setItems(response.data.items)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const addOrder = (name) => {
    const item = items.find(item => {
      return item.name === name
    })
    setAddItem(item)
  }

  const increase = () => {
    setCounter(count => count + 1)
  }

  const decrease = () => {
    setCounter(count => count != 1 ? count - 1 : count)
  } 
 
  const addToOrderArray = (itemName, price, counter) => {
    setOrder(order => order.concat({
      name: itemName,
      total: price * counter
    }))
    setOrderTotal(orderTotal => orderTotal + parseInt(price * counter) )
    console.log(orderTotal)
    setCounter(1)
    setAddItem()
  }
  
  const deleteItem = (id) => {
    console.log(id)
    if(window.confirm("Delete Item?")){
      itemDataService.deleteItem(id)
        .then(response => {
          console.log(response.data)
          props.history.push("/dashboard")
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

  const updateIncome = (income) => {
    const businessId = props.user._id
    const currentIncome = props.user.income
    const data = {income: parseInt(currentIncome + income)}
    userDataService.updateIncome(businessId, data)
    setOrder([])
    setOrderTotal(0)
  }

  console.log(order)

  return (
    <div className="container row d-flex flex-row-reverse">
      {/* <div className="text-left"> */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Current Order</h5>
              {order.map(orderItem => 
                <p className="card-text">
                  {orderItem.name}: {orderItem.total}
                </p>
              )}
              <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => updateIncome(orderTotal)}>Total: {orderTotal}</button>
            </div>
          </div>
        </div>
      {/* </div> */}
      <div className="col-md-4"></div>
      {props.user ? (                
        <div className="col-md-4 pb-1">
          <h1>Welcome {props.user.name}</h1>
          {items.map(item => 
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">
                Price: {item.price} <button className="btn btn-primary" onClick={() => addOrder(item.name)}>Add Item</button>
                <Link to={{pathname:"/add-item", state: {currentItem:item}}} className="btn btn-secondary">Edit Item</Link>
                <button className="btn btn-danger" onClick={() => deleteItem(item._id)}>Delete Item</button>
              </p>
            </div>
          </div>
          )}
          {addItem ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{addItem.name}</h5>
                <button className="btn btn-primary btn-sm" onClick={decrease}>-</button>
                <span className="m-2">{ counter }</span>
                <button className="btn btn-primary btn-sm" onClick={increase}>+</button>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary" onClick={() => addToOrderArray(addItem.name, addItem.price, counter)}>Add to Order</button>
                </div>
              </div>
            </div>
          ):(
            <div>
              
            </div>
          )}
        </div>
        
        
        
      ):(
        <div className="container mt-3"> 
          <h1>Please login</h1>        
          <Link to={"/login"} className="btn btn-primary">Login</Link>
        </div>
      )}
    </div>
    
  );
}

export default ItemList;
