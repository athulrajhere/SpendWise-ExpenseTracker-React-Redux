import Icon from "../../components/common/icon/Icon";
import { ICONS } from "../../constants/constants";
import "./SidebarOption.scss";

const SidebarOption = (option) => {
  return (
    <div
      id={option.option.id}
      className={option.isActive ? "sidebar-option isActive" : "sidebar-option"}
    >
      <div className="sidebar-icon">
        <Icon
          icon={ICONS[option.option.icon]}
          color={option.isActive ? "var(--purple-200)" : "var(--gray-100)"}
        ></Icon>
      </div>
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
