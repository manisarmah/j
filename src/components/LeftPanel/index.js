import styles from "./styles.module.css";
import image from "./square.jpg";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function LeftPanel() {
  const items = [
    "Overview",
    "Onboarding",
    "Monitoring",
    "Flagging",
    "Source of Income",
    "UAR",
  ];
  const [activeIndex, setActiveIndex] = useState(2);
  const navigate = useNavigate();
  const handleClick = (idx) => {
    setActiveIndex(idx);
    navigate(`/${items[idx].toLowerCase().replace(/\s/g, "")}`);
  };

  return (
    <div className={styles.leftPanelContainer}>
      <div className={styles.topContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logoText}>LOGO HERE</div>
        </div>
        <div className={styles.topicListContainer}>
          {items.map((item, idx) => {
            return (
              <p
                onClick={() => handleClick(idx)}
                style={{
                  backgroundColor: activeIndex === idx && "rgb(222, 224, 253)",
                  color: activeIndex === idx && "rgb(70,67,238)",
                  transition: "0.5s ease all",
                }}
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.profileImage}>
          <img src={image} alt="Profile" width="100%" />
        </div>
        <div className={styles.profileDetails}>
          <div className={styles.profileName}>Elon Musk</div>
          <div className={styles.profileEmail}>elon@twitter.com</div>
        </div>
      </div>
    </div>
  );
}
