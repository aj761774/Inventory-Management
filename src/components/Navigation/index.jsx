import { useDispatch, useSelector } from "react-redux";
import Toggle from "../Toggle";
import "./index.css";
import { updateIsAdmin } from "../../redux/inventorySlice";

const Navigation = () => {
  const isAdmin = useSelector(state => state.inventory.isAdmin);
  const dispatch = useDispatch();

  const handleToggle = ()=>{
     dispatch(updateIsAdmin(!isAdmin))
  }

  return (
    <div className="navigation-bar">
        Admin
        <Toggle isOn={!isAdmin} handleToggle={handleToggle}/>
        User
    </div>
  );
};

export default Navigation;
