import React, { useState } from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/inventorySlice";
import { toast } from "react-toastify";

const EditProduct = ({ data, index, handleClose }) => {
  const [productInfo, setProductInfo] = useState(data);
  const dispatch = useDispatch();

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setProductInfo((prev)=> ({...prev, [name]: [value]}))
  }

  const handleSave = ()=> {
    dispatch(updateProduct({index, data: productInfo}));
    toast.success("Product updated");
    handleClose()
  }

  return (
    <div className="edit-product-modal-wrapper">
      <div className="edit-product-modal">
        <div className="edit-product-form-header">
          <div>
            Edit Product
            <div className="edit-product-name">{productInfo.name}</div>
          </div>
          <span className="close-btn" onClick={handleClose}>x</span>
        </div>
        <div className="edit-product-form-body">
          <div>
            <div>Category</div>
            <input type="text" value={productInfo.category} name="category" onChange={handleChange}/>
          </div>
          <div>
            <div>Price</div>
            <input type="text" value={productInfo.price} name="price" onChange={handleChange}/>
          </div>
          <div>
            <div>Quantity</div>
            <input type="text" value={productInfo.quantity} name="quantity" onChange={handleChange}/>
          </div>
          <div>
            <div>Value</div>
            <input type="text" value={productInfo.value} name="value" onChange={handleChange}/>
          </div>
        </div>
        <div className="edit-product-form-footer">
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
