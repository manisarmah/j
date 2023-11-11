import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import ListStrip from "../ListStrip";
export default function RightPanelPrimaryDetails(props) {
  const data = props.items;
  const status = props.status;
  const filterBy = props.filterBy;
  const searchBy = props.searchBy;
  const pendingData = data?.filter((item) => !item.completed);
  const completedData = data?.filter((item) => item.completed);
  let finalData = status === "pending" ? pendingData : completedData;
  console.log(filterBy);
  console.log(finalData);
  if (filterBy !== "")
    finalData = finalData?.filter(
      (item) => item.riskLevel.toLowerCase() === filterBy
    );
  if (searchBy !== "") {
    finalData = finalData?.filter(
      (item) =>
        item.name.toLowerCase().startsWith(searchBy) ||
        item.name.toUpperCase().startsWith(searchBy) ||
        item.name.startsWith(searchBy)
    );
  }
  const headers = [
    "User",
    "Risk Level",
    status === "pending" ? "Trigger Reason" : "Action Reason",
    status === "pending" ? "In queue for" : "Time to Close",
    "Date added on",
    status === "pending" ? "Previously Reviewed" : "Action Taken By",
  ];

  return (
    <div className={styles.rightPanelPrimaryDetailsContainer}>
      <div className={styles.heading}>
        {headers.map((header, idx) => {
          return (
            <div style={{ display: "flex", gap: "0.3rem" }}>
              {header}
              {(header === "Risk Level" ||
                header === "In queue for" ||
                header === "Date added on") && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FontAwesomeIcon icon={faAngleUp} size="xs" />
                  <FontAwesomeIcon icon={faAngleDown} size="xs" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.content}>
        {finalData.map((item, idx) => {
          return <ListStrip items={item} key={idx} />;
        })}
      </div>
    </div>
  );
}
