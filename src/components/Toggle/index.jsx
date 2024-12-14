import "./index.css";

const Toggle = ({ isOn = false, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className="toggle-track"
      style={{
        justifyContent: isOn ? "flex-end" : "flex-start",
        backgroundColor: isOn ? "#4CAF50" : "#ccc"
      }}
    >
      <div className="toggle-btn" />
    </div>
  );
};

export default Toggle;
