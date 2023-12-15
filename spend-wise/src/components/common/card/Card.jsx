import "./card.scss";

const Card = ({children, className}) => {
  return <div className={`cards ${className}`}>
    {children}
  </div>;
};

export default Card;
