import React from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, disableEnableProduct } from "../../redux/inventorySlice";
import { toast } from "react-toastify";
import { DeleteIcon, DisabledIcon, EditIcon, EnabledIcon } from "../../assets";

const ProductRow = ({
  product,
  index,
  setEditProductData,
  setEditProductIndex
}) => {
  const isAdmin = useSelector(state => state.inventory.isAdmin);
  const dispatch = useDispatch();

  const handleDelete = index => {
    if (!isAdmin) return;
    dispatch(deleteProduct(index));
    toast.success("Product deleted");
  };

  const handleEdit = (data, index) => {
    if (!isAdmin) return;
    setEditProductData(data);
    setEditProductIndex(index);
  };

  const handleDisableEnable = (product, index) => {
    if (!isAdmin) return;
    dispatch(
      disableEnableProduct({ index: index, isDisabled: !product.isDisabled })
    );
  };

  return (
    <div
      className={`product-table-row ${product.isDisabled
        ? "disabled"
        : ""} ${isAdmin ? "permitted" : "not-permitted"}`}
    >
      <span>
        {product.name}
      </span>
      <span>
        {product.category}
      </span>
      <span>
        {product.price}
      </span>
      <span>
        {product.quantity}
      </span>
      <span>
        {product.value}
      </span>
      <span>
        <img
          src={EditIcon}
          alt="edit"
          className={`action-btn ${isAdmin ? "" : "disabled"}`}
          onClick={() => handleEdit(product, index)}
        />
        <img
          src={product.isDisabled ? DisabledIcon : EnabledIcon}
          alt="enable disable"
          className={`action-btn ${isAdmin ? "" : "disabled"}`}
          onClick={() => handleDisableEnable(product, index)}
        />
        <img
          src={DeleteIcon}
          alt="delete"
          className={`action-btn ${isAdmin ? "" : "disabled"}`}
          onClick={() => handleDelete(index)}
        />
      </span>
    </div>
  );
};

export default ProductRow;
