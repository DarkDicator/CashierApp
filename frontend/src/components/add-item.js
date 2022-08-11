import React, { useState } from "react";
import itemDataService from "../services/items"

const AddItem = props => {

  let initialItemState = {
    name: "",
    price: 0,
    businessId: props.user._id
  };

  let edit = false

  try{
    if (props.location.state.currentItem){
      initialItemState = props.location.state.currentItem
      edit = true
    }
  }catch{
    console.log("adding Item")
  }
  

  const [item, setItem] = useState(initialItemState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const saveItem = () => {
    if (edit){
      var data = {
        itemId: item._id,
        name: item.name,
        price: item.price
      }
      console.log(data)
      itemDataService.updateItem(data)
        .then(response => {
          console.log(response.data)
          props.history.push('/dashboard')
        })
        .catch(e => {
          console.log(e)
        })
    }else{
      var data = {
        name: item.name,
        price: item.price,
        businessId: item.businessId
      };
      console.log(data)
      itemDataService.addItem(data)
        .then(response => {
          props.history.push('/dashboard');
          console.log(response.data)
        })
        .catch(e => {
          console.log(e)
        })
    }
    
    
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="name">Item Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={item.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            required
            value={item.price}
            onChange={handleInputChange}
            name="price"
          />
        </div>
        {edit ? (
           <button onClick={saveItem} className="btn btn-success">
           Edit Item
            </button>
        ) : (
          <button onClick={saveItem} className="btn btn-success">
          Add Item
          </button>
        )}
       
      </div>
    </div>
  );
};

export default AddItem;