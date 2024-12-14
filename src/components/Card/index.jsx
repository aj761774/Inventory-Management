import "./index.css";

const Card = ({icon, title, value}) => {
  return <div className="card">
    <img src={icon} className="card-icon"/>
    <div className="card-title-value">
      <div>{title}</div>
      <div>{value}</div>
    </div>
  </div>;
};

export default Card;
