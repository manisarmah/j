import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function ListStrip(props) {
  const items = props.items;
  return (
    <div className={styles.listStrip}>
      <div className={styles.userDetails}>
        <div>
          {" "}
          <div className={styles.name}>{items.name}</div>
          <div className={styles.email}>{items.email}</div>
        </div>
        <div className={styles.profileVisitIcon}>
          <Link to="https://www.google.com" target="blank">
            {" "}
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              style={{ color: "blue" }}
            />
          </Link>
        </div>
      </div>
      <div
        className={styles.riskLevel}
        style={{
          color:
            items.riskLevel === "Medium"
              ? "rgb(136,103,15)"
              : items.riskLevel === "Low"
              ? "rgb(0,101,64)"
              : "rgb(125,36,36)",
        }}
      >
        <div
          className={styles.circle}
          style={{
            background:
              items.riskLevel === "Medium"
                ? "rgb(136,103,15)"
                : items.riskLevel === "Low"
                ? "rgb(0,101,64)"
                : "rgb(125,36,36)",
            height: "10px",
            width: "10px",
            borderRadius: "50%",
          }}
        ></div>
        <div>{items.riskLevel}</div>
      </div>
      <div>{items.completed ? items.actionReason : items.triggerReason}</div>
      <div>{items.completed ? items.timeToClose : items.inQueueFor}</div>
      <div>{items.dateAddedOn}</div>
      <div>
        {items.previouslyReviewed?.flag && (
          <div style={{ fontSize: "0.9rem" }}>Yes</div>
        )}
        <div
          style={{
            fontSize: items.previouslyReviewed ? "0.7rem" : "0.9rem",
            color: items.previouslyReviewed ? "grey" : "black",
          }}
        >
          {items.completed
            ? items.actionTakenBy.name
            : items.previouslyReviewed.date}
        </div>
        {items.actionTakenBy && (
          <div style={{ fontSize: "0.7rem", color: "grey" }}>
            {items.actionTakenBy.email}
          </div>
        )}
      </div>
    </div>
  );
}
