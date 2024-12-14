import Card from "../../components/Card";
import "./index.css";
import {
  shoppingCartIcon,
  dollarIcon,
  outOfStockIcon,
  catagoryIcon,
  EditIcon,
  DisabledIcon,
  EnabledIcon,
  DeleteIcon
} from "../../assets";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setProductsLoading
} from "../../redux/inventorySlice";
import EditProduct from "../../components/EditProduct";
import ProductRow from "../../components/ProductRow";

const Products = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.inventory.isLoadingProducts);
  const productList = useSelector(state => state.inventory.productList);
  const [editProductData, setEditProductData] = useState(null);
  const [editProductIndex, setEditProductIndex] = useState(-1);

  const getProducts = async () => {
    dispatch(setProductsLoading(true));
    try{
      const res = await fetch(
        "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
      );
      const data = await res.json();
      dispatch(setProducts(data));
    }catch(e){
      console.log(e)
    }
    
    dispatch(setProductsLoading(false));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const summary = useMemo(()=> {
    const result = productList.reduce((acc, curr)=> {
         acc.totalValue += +curr.value.slice(1, curr.value.length);
         acc.categories.add(curr.category);
         if(curr.quantity === 0){
          acc.outOfStock += 1;
         }
         return acc;
    }, {totalProducts: productList.length , totalValue: 0, categories: new Set(), outOfStock: 0 })
    return result;
  }, [productList]);

  const handleCancelUpdate = ()=> {
    setEditProductData(null);
    setEditProductIndex(-1)
  }

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <>
    <div className="products-container">
      <div className="title">Inventory Stats</div>
      <div className="cards">
        <Card icon={shoppingCartIcon} title="Total Product" value={summary.totalProducts} />
        <Card icon={dollarIcon} title="Total Store Value" value={`$${summary.totalValue}`} />
        <Card icon={outOfStockIcon} title="Out of stocks" value={summary.outOfStock} />
        <Card icon={catagoryIcon} title="No of catagory" value={summary.categories.size} />
      </div>
      <div className="product-table">
        <div className="product-table-header">
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Value</span>
          <span>Action</span>
        </div>
        {productList.map((product, index) =>
          <ProductRow product={product} key={index} index={index} setEditProductData={setEditProductData} setEditProductIndex={setEditProductIndex}/>
        )}
      </div>
    </div>
    {
      editProductData
      &&
      <EditProduct data={editProductData} index={editProductIndex} handleClose={handleCancelUpdate}/>
    }
    </>
  );
};

export default Products;
