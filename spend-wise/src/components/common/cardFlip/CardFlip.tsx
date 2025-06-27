import React, { useEffect, useState } from "react";
import "./cardFlip.scss";
import { motion } from "framer-motion";

interface CardFlipProps {
  value: any;
  isFlipped: boolean;
  onFlip?: () => void;
  front: React.ReactNode;
  back: React.ReactNode;
}

const CardFlip: React.FC<CardFlipProps> = ({ 
  value, 
  isFlipped, 
  onFlip, 
  front, 
  back 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    handleFlip();
  }, [value]);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
    }
  };

  return (
    <motion.div
      className="flip-card-inner"
      style={{ width: "100%", height: "50%" }}
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 360 }}
      transition={{ duration: 0.1, animateDirection: "normal" }}
      onAnimationComplete={() => setIsAnimating(false)}
    >
      <div className="flip-card-front">{front}</div>
      <div className="flip-card-back">{back}</div>
    </motion.div>
  );
};

export default CardFlip; 