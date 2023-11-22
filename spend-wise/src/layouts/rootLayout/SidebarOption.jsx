import "./SidebarOption.scss";

const SidebarOption = (option) => {
  return (
    <div
      id={option.option.id}
      className={option.isActive ? "sidebar-option isActive" : "sidebar-option"}
    >
      <div className="sidebar-icon">{option.option.icon}</div>
      <span className="sidebar-title">{option.option.name}</span>
      {option.isActive && (
        <div className="sidebar-border-container">
          <span className="sidebar-border"></span>
        </div>
      )}
    </div>
  );
};

export default SidebarOption;
